import React, { useState, useContext, useCallback } from 'react';
import { View } from 'react-native';
import { UserContext } from '../../../store/contexts/userContext';
import helpService from '../../../services/Help';
import NoHelps from '../../../components/NoHelps';
import callService from '../../../services/callService';
import styles from '../styles';
import PlusIconTextButton from '../../../components/PlusIconTextButton';
import createInteraction from '../../../utils/createInteraction';
import { LoadingContext } from '../../../store/contexts/loadingContext';
import { Dialog } from '../../../components/molecules/Dialog';
import { MyActivitiesFlatList } from '../../../components/molecules/MyActivitiesFlatList';
import { useFocusEffect } from '@react-navigation/native';

const MyRequestedHelp = ({ navigation, route }) => {
    const { user } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    const [myRequestedHelps, setMyRequestedHelps] = useState([]);
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [helpToDelete, setHelpToDelete] = useState(null);

    useFocusEffect(
        useCallback(() => {
            if (route.params.shouldUpdate) loadOnGoingHelps(setIsLoading);
        }, [route.params.shouldUpdate]),
    );

    async function loadOnGoingHelps(loadingSetter) {
        const { _id: userId } = user;
        loadingSetter(true);
        const filteredHelps = await callService(
            helpService,
            'getHelpMultipleStatus',
            [userId, ['waiting', 'on_going', 'helper_finished']],
        );
        if (!filteredHelps.error) {
            setMyRequestedHelps(filteredHelps);
        }
        loadingSetter(false);
        navigation.setParams({ shouldUpdate: false });
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
        navigation.setParams({ shouldUpdate: true });
    }

    const renderMyRequestsHelpList = () => {
        if (myRequestedHelps.length > 0) {
            return (
                <View style={styles.helpList}>
                    <MyActivitiesFlatList
                        data={myRequestedHelps}
                        loadOnGoingActivity={loadOnGoingHelps}
                        navigation={navigation}
                        setConfirmationModalVisible={
                            setConfirmationModalVisible
                        }
                        setHelpToDelete={setHelpToDelete}
                        type="help"
                    />
                </View>
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
