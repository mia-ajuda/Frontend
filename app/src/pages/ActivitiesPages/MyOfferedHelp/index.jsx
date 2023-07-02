import React, { useState, useContext, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import MyRequestHelpCard from '../../../components/MyRequestCard';
import { UserContext } from '../../../store/contexts/userContext';
import helpService from '../../../services/Help';
import styles from '../styles';
import NoHelps from '../../../components/NoHelps';
import { useFocusEffect } from '@react-navigation/native';
import callService from '../../../services/callService';
import PlusIconTextButton from '../../../components/PlusIconTextButton';
import createInteraction from '../../../utils/createInteraction';
import { LoadingContext } from '../../../store/contexts/loadingContext';
import { Dialog } from '../../../components/molecules/Dialog';

export default function HelpsFinished({ navigation }) {
    const { user, userPosition } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    const [finishedHelpList, setFinishedHelpList] = useState([]);
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [helpToDelete, setHelpToDelete] = useState(null);

    useFocusEffect(
        useCallback(() => {
            loadOnGoingOffers();
        }, [navigation]),
    );

    async function loadOnGoingOffers() {
        setIsLoading(true);
        const { _id: userId } = user;
        const resFinished = await callService(helpService, 'listHelpOffer', [
            userId,
            true,
            userPosition,
        ]);
        if (!resFinished.error) {
            setFinishedHelpList(resFinished);
        }
        setIsLoading(false);
    }

    async function excludeHelp() {
        setIsLoading(true);
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
        setIsLoading(false);
        setConfirmationModalVisible(false);
    }

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
            <Dialog
                isVisible={confirmationModalVisible && !isLoading}
                title="Deletar oferta de ajuda?"
                description="Você deseja deletar essa oferta de ajuda?"
                cancelText="Não"
                confirmText="Sim"
                onCloseDialog={() => setConfirmationModalVisible(false)}
                onConfirmPress={excludeHelp}
            />
            {!isLoading && renderHelpList()}
        </View>
    );
}
