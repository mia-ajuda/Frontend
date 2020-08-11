import React, { useState, useContext, useCallback } from 'react';
import {
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import MyRequestHelpCard from '../../../../components/MyRequestHelpCard';
import { UserContext } from '../../../../store/contexts/userContext';

import campaignService from '../../../../services/Campaign';

import styles from '../styles';
import ConfirmationModal from '../../../../components/modals/confirmationModal';
import { useFocusEffect } from '@react-navigation/native';
import NoHelps from '../../../../components/NoHelps';
import colors from '../../../../../assets/styles/colorVariables';
import useService from '../../../../services/useService';

export default function OnGoingCampaigns({ navigation }) {
    const [myRequestedCampaigns, setMyRequestedCampaigns] = useState([]);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(
        false,
    );
    const [campaignToDelete, setCampaignToDelete] = useState(null);
    const [loadingMyHelpRequests, setLoadingMyHelpRequests] = useState(false);
    const [isHelpDeletionLoading, setHelpDeletionLoading] = useState(false);
    const { user } = useContext(UserContext);

    useFocusEffect(
        useCallback(() => {
            loadOnGoingHelps();
        }, [navigation]),
    );

    async function loadOnGoingHelps() {
        const { _id: userId } = user;
        setLoadingMyHelpRequests(true);
        const filteredHelps = await useService(
            campaignService,
            'getCampaignMultipleStatus',
            [userId, ['waiting', 'on_going', 'helper_finished']],
        );
        if (!filteredHelps.error) {
            setMyRequestedCampaigns(filteredHelps);
        }
        setLoadingMyHelpRequests(false);
    }

    async function excludeHelp() {
        setHelpDeletionLoading(true);
        const validDeleteRequest = await useService(
            campaignService,
            'deleteHelp',
            [campaignToDelete],
        );
        if (!validDeleteRequest.error) {
            const updatedArray = myRequestedCampaigns.filter((help) => {
                return help._id !== campaignToDelete;
            });
            setMyRequestedCampaigns(updatedArray);
        }
        setHelpDeletionLoading(false);
        setConfirmationModalVisible(false);
    }

    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );

    const renderMyRequestsHelpList = () => {
        if (myRequestedCampaigns.length > 0) {
            return (
                <ScrollView>
                    <View style={styles.helpList}>
                        {myRequestedCampaigns.map((help) => (
                            <TouchableOpacity
                                key={help._id}
                                onPress={() =>
                                    navigation.navigate(
                                        'MyRequestHelpDescrition',
                                        {
                                            help,
                                        },
                                    )
                                }>
                                <MyRequestHelpCard
                                    help={help}
                                    deleteVisible={true}
                                    setConfirmationModalVisible={
                                        setConfirmationModalVisible
                                    }
                                    setSelectedHelp={setCampaignToDelete}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            );
        } else {
            return <NoHelps title={'Você não possui campanhas em andamento'} />;
        }
    };
    return (
        <View>
            <ConfirmationModal
                attention={true}
                visible={confirmationModalVisible}
                setVisible={setConfirmationModalVisible}
                action={() => excludeHelp()}
                message={'Você deseja deletar essa campanha?'}
                isLoading={isHelpDeletionLoading}
            />
            {loadingMyHelpRequests
                ? renderLoadingIndicator()
                : renderMyRequestsHelpList()}
        </View>
    );
}
