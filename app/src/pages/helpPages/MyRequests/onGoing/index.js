import React, { useState, useContext, useCallback } from 'react';
import {
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import MyRequestHelpCard from '../../../../components/MyRequestHelpCard';
import { UserContext } from '../../../../store/contexts/userContext';
import helpService from '../../../../services/Help';
import styles from '../styles';
import ConfirmationModal from '../../../../components/modals/confirmationModal';
import { useFocusEffect } from '@react-navigation/native';
import NoHelps from '../../../../components/NoHelps';
import colors from '../../../../../assets/styles/colorVariables';

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
        try {
            let filteredHelps = await helpService.getHelpMultipleStatus(
                userId,
                ['waiting', 'on_going', 'helper_finished'],
            );
            setMyHelpRequests(filteredHelps);
            setLoadingMyHelpRequests(false);
        } catch (err) {
            console.log(err);
        }
    }

    async function excludeHelp() {
        try {
            setHelpDeletionLoading(true);
            await helpService.deleteHelp(helpToDelete);
            setHelpDeletionLoading(false);
            const updatedArray = myHelpRequests.filter((help) => {
                return help._id !== helpToDelete;
            });
            setMyHelpRequests(updatedArray);
            setConfirmationModalVisible(false);
        } catch (error) {
            console.log(error);
        }
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
                            <TouchableOpacity
                                key={help._id}
                                onPress={() =>
                                    navigation.navigate('RequestDescription', {
                                        help,
                                    })
                                }>
                                <MyRequestHelpCard
                                    help={help}
                                    deleteVisible={true}
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
