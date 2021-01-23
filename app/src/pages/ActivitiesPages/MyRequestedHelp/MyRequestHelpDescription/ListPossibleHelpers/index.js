import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Image, Text } from 'react-native';
import getYearsSince from '../../../../../utils/getYearsSince';
import ConfirmationModal from '../../../../../components/modals/confirmationModal';
import HelpService from '../../../../../services/Help';
import { alertSuccess } from '../../../../../utils/Alert';
import NoPossibleHelpers from '../../../../../components/NoHelps';
import useService from '../../../../../services/useService';
import styles from './styles';
import shortenName from '../../../../../utils/shortenName';

export default function ListPossibleHelpers({ navigation, route }) {
    const { help } = route.params;
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(
        false,
    );
    const [isChooseRequestLoading, setChooseRequestLoading] = useState(false);
    const [selectedHelperId, setSelectedHelperId] = useState(false);

    const goBackToMyRequestsPage = () => navigation.goBack();

    async function chooseHelper() {
        setChooseRequestLoading(true);
        const chooseHelperRequest = await useService(
            HelpService,
            'chooseHelper',
            [help._id, selectedHelperId],
        );
        if (!chooseHelperRequest.error) {
            alertSuccess('Ajudante escolhido com sucesso!');
        }
        goBackToMyRequestsPage();
    }

    const renderPossibleHelpersList = () => {
        const possibleHelpers = help?.possibleHelpers.concat(
            help?.possibleEntities,
        );
        return possibleHelpers.map((helper) => (
            <TouchableOpacity
                key={helper._id}
                onPress={() => {
                    setSelectedHelperId(helper._id);
                    setConfirmationModalVisible(true);
                }}>
                <View style={styles.helper}>
                    <Image
                        style={styles.imageProfile}
                        source={{
                            uri: `data:image/png;base64,${helper.photo}`,
                        }}
                    />
                    <View>
                        <Text style={[styles.infoText, styles.infoTextFont]}>
                            {shortenName(helper.name)}
                        </Text>
                        {getYearsSince(helper.birthday) != 0 && (
                            <Text>
                                <Text
                                    style={[
                                        styles.infoText,
                                        styles.infoTextFont,
                                    ]}>
                                    Idade:{' '}
                                </Text>
                                {getYearsSince(helper.birthday)}
                            </Text>
                        )}
                        <Text>
                            <Text
                                style={[styles.infoText, styles.infoTextFont]}>
                                Cidade:{' '}
                            </Text>
                            {helper.address.city}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        ));
    };
    const renderNoPossibleHelpersMessage = () => (
        <View style={styles.noPossibleHelpers}>
            <NoPossibleHelpers
                title={'Você ainda não possui possíveis ajudantes'}
            />
        </View>
    );
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {help?.possibleHelpers.length > 0 ||
            help?.possibleEntities.length > 0
                ? renderPossibleHelpersList()
                : renderNoPossibleHelpersMessage()}
            <ConfirmationModal
                visible={confirmationModalVisible}
                setVisible={setConfirmationModalVisible}
                action={chooseHelper}
                message={
                    'Você tem certeza que deseja este usuário como seu ajudante?'
                }
                isLoading={isChooseRequestLoading}
            />
        </ScrollView>
    );
}
