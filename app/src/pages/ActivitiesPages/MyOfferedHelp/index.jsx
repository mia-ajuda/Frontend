import React, { useState, useContext, useCallback } from 'react';
import { View } from 'react-native';
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
import { ActivityCard } from '../../../components/organisms/ActivityCard';
import { FlatList } from 'react-native-gesture-handler';

export default function HelpsFinished({ navigation }) {
    const { user, userPosition } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    const [finishedHelpList, setFinishedHelpList] = useState([]);
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [helpToDelete] = useState(null);

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
                <FlatList
                    data={finishedHelpList}
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
