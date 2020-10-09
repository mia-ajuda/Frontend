import React, { useState, useContext, useCallback } from 'react';
import {
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import MyRequestHelpCard from '../../../components/MyRequestHelpCard';
import { UserContext } from '../../../store/contexts/userContext';
import helpService from '../../../services/Help';
import ConfirmationModal from '../../../components/modals/confirmationModal';
import { useFocusEffect } from '@react-navigation/native';
import NoHelps from '../../../components/NoHelps';
import colors from '../../../../assets/styles/colorVariables';
import useService from '../../../services/useService';
import styles from '../styles';

const MyRequestedHelp = ({ navigation }) => {
    const [myRequestedHelps, setMyRequestedHelps] = useState([]);
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
            setMyRequestedHelps(filteredHelps);
        }
        setLoadingMyHelpRequests(false);
    }

    async function excludeHelp() {
        setHelpDeletionLoading(true);
        const validDeleteRequest = await useService(helpService, 'deleteHelp', [
            helpToDelete,
        ]);
        if (!validDeleteRequest.error) {
            const updatedArray = myRequestedHelps.filter((help) => {
                return help._id !== helpToDelete;
            });
            setMyRequestedHelps(updatedArray);
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
        if (myRequestedHelps.length > 0) {
            return (
                <ScrollView>
                    <View style={styles.helpList}>
                        {myRequestedHelps.map((help) => (
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
};

export default MyRequestedHelp;
