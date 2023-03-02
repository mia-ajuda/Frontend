import React, { useState, useContext, useCallback } from 'react';
import {
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import MyRequestHelpCard from '../../../components/MyRequestCard';
import { UserContext } from '../../../store/contexts/userContext';
import helpService from '../../../services/Help';
import styles from '../styles';
import colors from '../../../../assets/styles/colorVariables';

import NoHelps from '../../../components/NoHelps';
import { useFocusEffect } from '@react-navigation/native';
import callService from '../../../services/callService';
import ConfirmationModal from '../../../components/modals/confirmationModal';
import PlusIconTextButton from '../../../components/PlusIconTextButton';
import createInteraction from '../../../utils/createInteraction';

export default function HelpsFinished({ navigation }) {
    const [finishedHelpList, setFinishedHelpList] = useState([]);
    const [loadingHelpRequests, setLoadingHelpRequests] = useState(false);
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [helpToDelete, setHelpToDelete] = useState(null);
    const [isHelpDeletionLoading, setHelpDeletionLoading] = useState(false);

    const { user } = useContext(UserContext);
    useFocusEffect(
        useCallback(() => {
            loadOnGoingOffers();
        }, [navigation]),
    );

    async function loadOnGoingOffers() {
        setLoadingHelpRequests(true);
        const { _id: userId } = user;
        const resFinished = await callService(helpService, 'listHelpOffer', [
            userId,
            true,
        ]);
        if (!resFinished.error) {
            setFinishedHelpList(resFinished);
        }
        setLoadingHelpRequests(false);
    }

    async function excludeHelp() {
        setHelpDeletionLoading(true);
        const validDeleteRequest = await callService(
            helpService,
            'deleteHelp',
            ['helpOffer', helpToDelete],
        );
        if (!validDeleteRequest.error) {
            const updatedArray = finishedHelpList.filter((help) => {
                return help._id !== helpToDelete;
            });
            setFinishedHelpList(updatedArray);
        }
        setHelpDeletionLoading(false);
        setConfirmationModalVisible(false);
    }

    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );

    const renderHelpList = () => {
        if (finishedHelpList.length > 0) {
            return (
                <ScrollView>
                    <View style={styles.helpList}>
                        {finishedHelpList.map((help) => {
                            return (
                                <TouchableOpacity
                                    key={help._id}
                                    onPress={() =>
                                        navigation.navigate(
                                            'myOfferHelpDescription',
                                            {
                                                helpId: help._id,
                                                routeId: 'HelpOffer',
                                            },
                                        )
                                    }
                                >
                                    <MyRequestHelpCard
                                        object={help}
                                        possibleInterestedList={[
                                            ...help.possibleHelpedUsers,
                                            ...help.helpedUserId,
                                        ]}
                                        setConfirmationModalVisible={
                                            setConfirmationModalVisible
                                        }
                                        setSelectedHelp={setHelpToDelete}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>
            );
        } else {
            return <NoHelps title={'Você não possui nenhuma oferta criada'} />;
        }
    };
    return (
        <View style={styles.container}>
            <PlusIconTextButton
                text="Criar oferta"
                onPress={() =>
                    createInteraction(user, navigation, 'createHelpOffer')
                }
            />
            <ConfirmationModal
                attention={true}
                visible={confirmationModalVisible}
                setVisible={setConfirmationModalVisible}
                action={() => excludeHelp()}
                message={'Você deseja deletar essa oferta de ajuda?'}
                isLoading={isHelpDeletionLoading}
            />
            {loadingHelpRequests ? renderLoadingIndicator() : renderHelpList()}
        </View>
    );
}
