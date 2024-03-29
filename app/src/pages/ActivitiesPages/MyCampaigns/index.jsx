import React, { useState, useContext, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import MyRequestCard from '../../../components/MyRequestCard';
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
                <ScrollView>
                    <View style={styles.campaignList}>
                        {finishedCampaignList.map((campaign) => {
                            if (campaign.ownerId === user._id) {
                                return (
                                    <TouchableOpacity
                                        // Botão que leva para a page de Descrição
                                        key={campaign._id}
                                        onPress={() =>
                                            navigation.navigate(
                                                'campaignDescription',
                                                {
                                                    campaign,
                                                },
                                            )
                                        }
                                    >
                                        {/* Tirar isEntityUser depois */}
                                        <MyRequestCard
                                            object={campaign}
                                            isEntityUser={true}
                                            setConfirmationModalVisible={
                                                setConfirmationModalVisible
                                            }
                                            setSelectedHelp={
                                                setCampaignToDelete
                                            }
                                        />
                                    </TouchableOpacity>
                                );
                            } else {
                                return (
                                    <NoHelps
                                        key={campaign._id}
                                        title={
                                            'Você não possui nenhuma campanha criada'
                                        }
                                    />
                                );
                            }
                        })}
                        {/*TODO: O `if` foi adicionado porque as ajudas estavam aparecendo mesmo se voce nao for dono... Rever essa logica para uma mais escalavel.*/}
                    </View>
                </ScrollView>
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
