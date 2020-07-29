import React, { useState, useContext, useCallback } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import ListCard from '../../../../components/ListCard';
import { UserContext } from '../../../../store/contexts/userContext';
import helpService from '../../../../services/Help';
import styles from '../styles';
import ConfirmationModal from '../../../../components/modals/confirmationModal';
import { useFocusEffect } from '@react-navigation/native';
import NoHelps from '../../../../components/NoHelps';
import colors from '../../../../../assets/styles/colorVariables';
import useService from '../../../../services/useService';

export default function OnGoingHelps({ navigation }) {
    const [myHelpRequests, setMyHelpRequests] = useState([]);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(
        false,
    );
    const [helpToDelete, setHelpToDelete] = useState(null);
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
            helpService,
            'getHelpMultipleStatus',
            [userId, ['waiting', 'on_going', 'helper_finished']],
        );
        if (!filteredHelps.error) {
            setMyHelpRequests(filteredHelps);
        }
        setLoadingMyHelpRequests(false);
    }

    async function excludeHelp() {
        setHelpDeletionLoading(true);
        const validDeleteRequest = await useService(helpService, 'deleteHelp', [
            helpToDelete,
        ]);
        if (!validDeleteRequest.error) {
            const updatedArray = myHelpRequests.filter((help) => {
                return help._id !== helpToDelete;
            });
            setMyHelpRequests(updatedArray);
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
        if (myHelpRequests.length > 0) {
            return (
                <ScrollView>
                    <View style={styles.helpList}>
                        {myHelpRequests.map((help) => (
                            <View key={help._id}>
                                <ListCard
                                    helpTitle={help.title}
                                    helpId={help._id}
                                    helpDescription={help.description}
                                    categoryName={help.category[0].name}
                                    deleteVisible={true}
                                    setConfirmationModalVisible={
                                        setConfirmationModalVisible
                                    }
                                    setSelectedHelp={setHelpToDelete}
                                    navigation={navigation}
                                    possibleHelpers={help.possibleHelpers}
                                    ownerId={help.ownerId}
                                    helpStatus={help.status}
                                    helperId={help.helperId}
                                    pageName="RequestDescription"
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            );
        } else {
            return <NoHelps title={'Você não possui ajudas em andamento'} />;
        }
    };
    return (
        <View>
            <ConfirmationModal
                attention={true}
                visible={confirmationModalVisible}
                setVisible={setConfirmationModalVisible}
                action={() => excludeHelp()}
                message={'Você deseja deletar esse pedido de ajuda?'}
                isLoading={isHelpDeletionLoading}
            />
            {loadingMyHelpRequests
                ? renderLoadingIndicator()
                : renderMyRequestsHelpList()}
        </View>
    );
}
