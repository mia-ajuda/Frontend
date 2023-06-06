import React, { useState, useContext, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import MyRequestCard from '../../../components/MyRequestCard';
import { UserContext } from '../../../store/contexts/userContext';
import helpService from '../../../services/Help';
import { useFocusEffect } from '@react-navigation/native';
import NoHelps from '../../../components/NoHelps';
import callService from '../../../services/callService';
import styles from '../styles';
import PlusIconTextButton from '../../../components/PlusIconTextButton';
import createInteraction from '../../../utils/createInteraction';
import { LoadingContext } from '../../../store/contexts/loadingContext';
import { Dialog } from '../../../components/molecules/Dialog';

const MyRequestedHelp = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    const [myRequestedHelps, setMyRequestedHelps] = useState([]);
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [helpToDelete, setHelpToDelete] = useState(null);

    useFocusEffect(
        useCallback(() => {
            loadOnGoingHelps();
        }, [navigation]),
    );

    async function loadOnGoingHelps() {
        const { _id: userId } = user;
        setIsLoading(true);
        const filteredHelps = await callService(
            helpService,
            'getHelpMultipleStatus',
            [userId, ['waiting', 'on_going', 'helper_finished']],
        );
        if (!filteredHelps.error) {
            setMyRequestedHelps(filteredHelps);
        }
        setIsLoading(false);
    }

    async function excludeHelp() {
        setIsLoading(true);
        const validDeleteRequest = await callService(
            helpService,
            'deleteHelp',
            ['help', helpToDelete],
        );
        if (!validDeleteRequest.error) {
            const updatedArray = myRequestedHelps.filter((help) => {
                return help._id !== helpToDelete;
            });
            setMyRequestedHelps(updatedArray);
        }
        setIsLoading(false);
        setConfirmationModalVisible(false);
    }

    const renderMyRequestsHelpList = () => {
        if (myRequestedHelps.length > 0) {
            return (
                <ScrollView>
                    <View style={styles.helpList}>
                        {myRequestedHelps.map((help) => (
                            <TouchableOpacity
                                key={help._id}
                                onPress={() =>
                                    navigation.navigate(
                                        'myRequestHelpDescription',
                                        {
                                            helpId: help._id,
                                            routeId: 'Help',
                                        },
                                    )
                                }
                            >
                                <MyRequestCard
                                    object={help}
                                    deleteVisible={true}
                                    possibleInterestedList={
                                        help.possibleHelpers
                                    }
                                    setConfirmationModalVisible={
                                        setConfirmationModalVisible
                                    }
                                    setSelectedHelp={setHelpToDelete}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            );
        } else {
            return <NoHelps title={'Você não possui ajudas em andamento'} />;
        }
    };

    return (
        <View style={styles.container}>
            <PlusIconTextButton
                text="Criar pedido"
                onPress={() =>
                    createInteraction(user, navigation, 'createHelpRequest')
                }
            />
            <Dialog
                isVisible={confirmationModalVisible && !isLoading}
                title="Finalizar pedido?"
                description="Você tem certeza que deseja finalizar esse pedido?"
                cancelText="Não"
                confirmText="Sim"
                onCloseDialog={() => setConfirmationModalVisible(false)}
                onConfirmPress={excludeHelp}
            />
            {!isLoading && renderMyRequestsHelpList()}
        </View>
    );
};

export default MyRequestedHelp;
