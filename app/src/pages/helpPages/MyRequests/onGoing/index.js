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
import { ServiceContext } from '../../../../store/contexts/serviceContext';

export default function OnGoingHelps({ navigation }) {
    const [onGoingHelpList, setOnGoingHelpList] = useState([]);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(
        false,
    );
    const [selectedHelp, setSelectedHelp] = useState(null);
    const [loadingHelps, setLoadingHelps] = useState(false);
    const [isLoadingModal, setIsLoadingModal] = useState(false);
    const { user } = useContext(UserContext);
    const { _id: userId } = user;
    const { useService } = useContext(ServiceContext);

    useFocusEffect(
        useCallback(() => {
            loadOnGoingHelps();
        }, [navigation]),
    );

    async function loadOnGoingHelps() {
        setLoadingHelps(true);
        const filteredHelps = await useService(
            helpService,
            'getHelpMultipleStatus',
            [userId, ['waiting', 'on_going', 'helper_finished']],
        );
        if (filteredHelps) {
            setOnGoingHelpList(filteredHelps);
        }
        setLoadingHelps(false);
    }

    async function excludeHelp() {
        setIsLoadingModal(true);
        const validRequest = await useService(helpService, 'deleteHelp', [
            selectedHelp,
        ]);
        if (validRequest) {
            const updatedArray = onGoingHelpList.filter((help) => {
                return help._id !== selectedHelp;
            });
            setOnGoingHelpList(updatedArray);
        }
        setIsLoadingModal(false);
        setConfirmationModalVisible(false);
    }

    return (
        <View>
            <ConfirmationModal
                attention={true}
                visible={confirmationModalVisible}
                setVisible={setConfirmationModalVisible}
                action={() => excludeHelp()}
                message={'Você deseja deletar esse pedido de ajuda?'}
                isLoading={isLoadingModal}
            />
            {loadingHelps ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : onGoingHelpList.length > 0 ? (
                <ScrollView>
                    <View style={styles.helpList}>
                        {onGoingHelpList.map((item) => (
                            <View key={item._id}>
                                <ListCard
                                    helpTitle={item.title}
                                    helpId={item._id}
                                    helpDescription={item.description}
                                    categoryName={item.category[0].name}
                                    deleteVisible={true}
                                    setConfirmationModalVisible={
                                        setConfirmationModalVisible
                                    }
                                    setSelectedHelp={setSelectedHelp}
                                    navigation={navigation}
                                    possibleHelpers={item.possibleHelpers}
                                    ownerId={item.ownerId}
                                    helpStatus={item.status}
                                    helperId={item.helperId}
                                    pageName="RequestDescription"
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <NoHelps title={'Você não possui ajudas em andamento'} />
            )}
        </View>
    );
}
