import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import NoPossibleInteresteds from '../../components/NoHelps';
import useService from '../../services/useService';
import styles from './styles';
import helpService from '../../services/Help';
import colors from '../../../assets/styles/colorVariables';
import ConfirmationModal from '../modals/confirmationModal';
import { alertSuccess } from '../../utils/Alert';
import UserCard from './UserCard';

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
            <UserCard
                key={interested._id}
                handleClick={renderClickAction}
                user={interested}
            />
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
