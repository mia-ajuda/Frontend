import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    View,
    Image,
    Text,
} from 'react-native';
import getYearsSince from '../../../../../utils/getYearsSince';
import ConfirmationModal from '../../../../../components/modals/confirmationModal';
import HelpService from '../../../../../services/Help';
import { alertSuccess } from '../../../../../utils/Alert';
import NoPossibleHelpers from '../../../../../components/NoHelps';
import useService from '../../../../../services/useService';
import styles from './styles';
import shortenName from '../../../../../utils/shortenName';
import helpService from '../../../../../services/Help';
import colors from '../../../../../../assets/styles/colorVariables';

export default function ListPossibleHelpers({ route, navigation }) {
    const { helpId } = route.params;
    const [help, setHelp] = useState(null);
    const [isHelpLoading, setIsHelpLoading] = useState(false);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(
        false,
    );
    const [isChooseRequestLoading, setChooseRequestLoading] = useState(false);
    const [selectedHelperId, setSelectedHelperId] = useState(false);

    useEffect(() => {
        getHelpData();
    }, []);

    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );

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

    const getHelpData = async () => {
        setIsHelpLoading(true);
        const helpData = await useService(
            helpService,
            'getHelpWithAggregationById',
            [helpId],
        );
        setHelp(helpData);
        setIsHelpLoading(false);
    };

    const goBackToMyRequestsPage = () => navigation.navigate('Atividades');

    const renderPossibleHelpersList = () => {
        const possibleHelpers = help.possibleHelpers.concat(
            help.possibleEntities,
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

    const renderNoPossibleHelpersMessage = () => {
        return (
            <View style={styles.noPossibleHelpers}>
                <NoPossibleHelpers
                    title={'Você ainda não possui possíveis ajudantes'}
                />
            </View>
        );
    };

    const renderList = () => {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                {help &&
                (help.possibleHelpers.length > 0 ||
                    help.possibleEntities.length > 0)
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
    };

    return isHelpLoading ? renderLoadingIndicator() : renderList();
}
