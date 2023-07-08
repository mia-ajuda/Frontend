import React, { useState, useContext, useCallback } from 'react';
import { View } from 'react-native';
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
import { FlatList } from 'react-native-gesture-handler';
import { ActivityCard } from '../../../components/organisms/ActivityCard';

const MyRequestedHelp = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    const [myRequestedHelps, setMyRequestedHelps] = useState([]);
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [helpToDelete] = useState(null);

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
                <FlatList
                    data={myRequestedHelps}
                    style={{ marginHorizontal: 8, marginTop: 8 }}
                    renderItem={({ item, index }) => (
                        <ActivityCard
                            variant={item.type}
                            id={item._id}
                            ownerId={item.ownerId}
                            count={index + 1}
                            title={item.title}
                            description={item.description}
                            badges={item.categories}
                            distance={item.distance}
                            creationDate={item.creationDate}
                            userId={item.ownerId}
                            size='large'
                        />
                    )}
                    keyExtractor={(item) => item._id}
                />
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
