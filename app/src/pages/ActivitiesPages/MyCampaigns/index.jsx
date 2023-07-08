import React, { useState, useContext, useCallback } from 'react';
import { View } from 'react-native';
import { UserContext } from '../../../store/contexts/userContext';
import styles from '../styles';
import NoHelps from '../../../components/NoHelps';
import { useFocusEffect } from '@react-navigation/native';
import callService from '../../../services/callService';
import campaignService from '../../../services/Campaign';
import PlusIconTextButton from '../../../components/PlusIconTextButton';
import createInteraction from '../../../utils/createInteraction';
import { LoadingContext } from '../../../store/contexts/loadingContext';
import { Dialog } from '../../../components/molecules/Dialog';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityCard } from '../../../components/organisms/ActivityCard';

export default function CampaignsFinished({ navigation }) {
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const { user } = useContext(UserContext);

    const [finishedCampaignList, setFinishedCampaignList] = useState([]);
    const [campaignToDelete, setCampaignToDelete] = useState(null);
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);

    useFocusEffect(
        useCallback(() => {
            loadOnGoingCampaigns();
        }, [navigation]),
    );

    async function loadOnGoingCampaigns() {
        setIsLoading(true);
        const { _id: userId } = user;
        const resFinished = await callService(
            campaignService,
            'getCampaignMultipleStatus',
            [userId, 'waiting'],
        );
        if (!resFinished.error) {
            setFinishedCampaignList(resFinished);
        }
        setIsLoading(false);
    }

    const onPressPlusButton = () =>
        createInteraction(user, navigation, 'createCampaign');
    async function excludeCampaign() {
        setIsLoading(true);
        const validDeleteRequest = await callService(
            campaignService,
            'deleteCampaign',
            [campaignToDelete],
        );
        if (!validDeleteRequest.error) {
            const updatedArray = finishedCampaignList.filter((help) => {
                return help._id !== campaignToDelete;
            });
            setFinishedCampaignList(updatedArray);
        }
        setIsLoading(false);
        setConfirmationModalVisible(false);
    }

    const renderCampaignList = () => {
        if (finishedCampaignList.length > 0) {
            return (
                <FlatList
                    data={finishedCampaignList}
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
            return (
                <NoHelps title={'Você não possui nenhuma campanha criada'} />
            );
        }
    };

    return (
        <View style={styles.container}>
            <PlusIconTextButton
                text="Criar campanha"
                onPress={onPressPlusButton}
            />
            <Dialog
                isVisible={confirmationModalVisible && !isLoading}
                title="Finalizar campanha?"
                description="Você tem certeza que deseja finalizar essa campanha?"
                cancelText="Não"
                confirmText="Sim"
                onCloseDialog={() => setConfirmationModalVisible(false)}
                onConfirmPress={excludeCampaign}
            />
            {!isLoading && renderCampaignList()}
        </View>
    );
}
