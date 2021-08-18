import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    View,
    Image,
    Text,
} from 'react-native';
import getYearsSince from '../../utils/getYearsSince';
import NoPossibleInteresteds from '../../components/NoHelps';
import useService from '../../services/useService';
import styles from './styles';
import shortenName from '../../utils/shortenName';
import helpService from '../../services/Help';
import colors from '../../../assets/styles/colorVariables';
import ConfirmationModal from '../modals/confirmationModal';
import { alertSuccess } from '../../utils/Alert';

export default function ListPossibleInteresteds({ route, navigation }) {
    const { helpId, routeId, message } = route.params;
    const [help, setHelp] = useState(null);
    const [isHelpLoading, setIsHelpLoading] = useState(false);
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [isChooseRequestLoading, setChooseRequestLoading] = useState(false);
    const [selectedInterestedId, setSelectedInterestedId] = useState(false);

    const goBackToMyRequestsPage = () => navigation.navigate('Atividades');

    useEffect(() => {
        getHelpData();
    }, []);

    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );

    const getHelpData = async () => {
        setIsHelpLoading(true);
        const helpData = await useService(
            helpService,
            `get${routeId}WithAggregationById`,
            [helpId],
        );
        setHelp(helpData);
        setIsHelpLoading(false);
    };

    const chooseHelper = async () => {
        setChooseRequestLoading(true);
        const chooseHelperRequest = await useService(
            helpService,
            'chooseHelper',
            [helpId, selectedInterestedId],
        );
        if (!chooseHelperRequest.error) {
            alertSuccess('Ajudante escolhido com sucesso!');
        }
        goBackToMyRequestsPage();
    };

    const renderPossibleInterestedsList = () => {
        let possibleInteresteds;
        if (routeId == 'Help') {
            possibleInteresteds = help.possibleHelpers.concat(
                help.possibleEntities,
            );
        } else {
            possibleInteresteds = help.possibleHelpedUsers.concat(
                help.possibleEntities,
            );
        }

        const renderClickAction = (interestedId) => {
            if (routeId == 'Help') {
                {
                    setSelectedInterestedId(interestedId);
                    setConfirmationModalVisible(true);
                }
            }
        };

        return possibleInteresteds.map((interested) => (
            <TouchableOpacity
                key={interested._id}
                onPress={() => renderClickAction(interested._id)}>
                <View style={styles.interested}>
                    <Image
                        style={styles.imageProfile}
                        source={{
                            uri: `data:image/png;base64,${interested.photo}`,
                        }}
                    />
                    <View>
                        <Text style={[styles.infoText, styles.infoTextFont]}>
                            {shortenName(interested.name)}
                        </Text>
                        {getYearsSince(interested.birthday) != 0 && (
                            <Text>
                                <Text
                                    style={[
                                        styles.infoText,
                                        styles.infoTextFont,
                                    ]}>
                                    Idade:{' '}
                                </Text>
                                {getYearsSince(interested.birthday)}
                            </Text>
                        )}
                        <Text>
                            <Text
                                style={[styles.infoText, styles.infoTextFont]}>
                                Cidade:{' '}
                            </Text>
                            {interested.address.city}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        ));
    };

    const renderNoPossibleInterestedsMessage = () => {
        return (
            <View style={styles.noPossibleInteresteds}>
                <NoPossibleInteresteds
                    title={'Você ainda não possui interessados na ajuda.'}
                />
            </View>
        );
    };

    const renderList = () => {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                {help &&
                (help.possibleHelpedUsers?.length > 0 ||
                    help.possibleHelpers?.length > 0 ||
                    help.possibleEntities.length > 0)
                    ? renderPossibleInterestedsList()
                    : renderNoPossibleInterestedsMessage()}
                <ConfirmationModal
                    visible={confirmationModalVisible}
                    setVisible={setConfirmationModalVisible}
                    action={chooseHelper}
                    message={message}
                    isLoading={isChooseRequestLoading}
                />
            </ScrollView>
        );
    };

    return isHelpLoading ? renderLoadingIndicator() : renderList();
}
