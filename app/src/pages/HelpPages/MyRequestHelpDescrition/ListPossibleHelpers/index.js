import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Image, Text } from 'react-native';
import getYearsSince from '../../../../utils/getYearsSince';
import ConfirmationModal from '../../../../components/modals/confirmationModal';
import HelpService from '../../../../services/Help';
import { alertSuccess } from '../../../../utils/Alert';
import NoPossibleHelpers from '../../../../components/NoHelps';
import useService from '../../../../services/useService';
import styles from './styles';

export default function ListPossibleHelpers({ navigation, route }) {
    const { help } = route.params;
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(
        false,
    );
    const [isChooseRequestLoading, setChooseRequestLoading] = useState(false);
    const [selectedHelperId, setSelectedHelperId] = useState(false);

    const goBackToMyRequestsPage = () => navigation.navigate('Meus pedidos');

    async function chooseHelper() {
        setChooseRequestLoading(true);
        const validRequest = await useService(HelpService, 'chooseHelper', [
            help._id,
            selectedHelperId,
        ]);
        if (!validRequest.error) {
            goBackToMyRequestsPage();
            alertSuccess('Ajudante escolhido com sucesso!');
        } else {
            goBackToMyRequestsPage();
        }
    }

    const renderPossibleHelpersList = () => {
        return help.possibleHelpers.map((helper) => (
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
                            {helper.name}
                        </Text>
                        <Text>
                            <Text
                                style={[styles.infoText, styles.infoTextFont]}>
                                Idade:{' '}
                            </Text>
                            {getYearsSince(helper.birthday)}
                        </Text>
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
            {help.possibleHelpers.length > 0
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
