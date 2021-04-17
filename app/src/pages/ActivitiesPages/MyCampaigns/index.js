import React, { useState, useContext, useCallback } from 'react';
import {
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import MyRequestCard from '../../../components/MyRequestCard';
import { UserContext } from '../../../store/contexts/userContext';
import styles from '../styles';
import colors from '../../../../assets/styles/colorVariables';
import ConfirmationModal from '../../../components/modals/confirmationModal';
import NoHelps from '../../../components/NoHelps';
import { useFocusEffect } from '@react-navigation/native';
import useService from '../../../services/useService';
import campaignService from '../../../services/Campaign';

export default function CampaignsFinished({ navigation }) {
    const [finishedCampaignList, setFinishedCampaignList] = useState([]);
    const [loadingCampaignRequests, setLoadingCampaignRequests] = useState(
        false,
    );
    const [campaignDeletionLoading, setCampaignDeletionLoading] = useState(
        false,
    );
    const [campaignToDelete, setCampaignToDelete] = useState(null);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(
        false,
    );

    const { user } = useContext(UserContext);
    useFocusEffect(
        useCallback(() => {
            loadOnGoingCampaigns();
        }, [navigation]),
    );

    async function loadOnGoingCampaigns() {
        setLoadingCampaignRequests(true);
        const { _id: userId } = user;
        const resFinished = await useService(
            campaignService,
            'getCampaignMultipleStatus',
            [userId, 'waiting'],
        );
        if (!resFinished.error) {
            setFinishedCampaignList(resFinished);
        }
        setLoadingCampaignRequests(false);
    }

    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );

    async function excludeCampaign() {
        setCampaignDeletionLoading(true);
        const validDeleteRequest = await useService(
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
        setCampaignDeletionLoading(false);
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
                                        }>
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
        <View>
            <ConfirmationModal
                attention={true}
                visible={confirmationModalVisible}
                setVisible={setConfirmationModalVisible}
                action={() => excludeCampaign()}
                message={'Você deseja deletar essa campanha?'}
                isLoading={campaignDeletionLoading}
            />
            {loadingCampaignRequests
                ? renderLoadingIndicator()
                : renderCampaignList()}
        </View>
    );
}
