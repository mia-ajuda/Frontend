import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import NoPossibleInteresteds from '../../components/NoHelps';
import styles from './styles';
import helpService from '../../services/Help';
import ConfirmationModal from '../modals/confirmationModal';
import useService from '../../services/useService';
import { alertSuccess } from '../../utils/Alert';
import UserCard from './UserCard';

export default function ListPossibleInteresteds({ route, navigation }) {
    const { possibleInteresteds, message, method, helpId } = route.params;
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [isChooseRequestLoading, setChooseRequestLoading] = useState(false);
    const [selectedInterestedId, setSelectedInterestedId] = useState(false);

    const chooseInterested = async () => {
        setChooseRequestLoading(true);
        const chooseInterestedUserRequest = await useService(
            helpService,
            method,
            [helpId, selectedInterestedId],
        );
        if (!chooseInterestedUserRequest.error) {
            alertSuccess('O interessado foi escolhido com sucesso!');
        }

        navigation.navigate('Atividades');
    };

    const renderPossibleInterestedsList = () => {
        const renderClickAction = (interestedId) => {
            setSelectedInterestedId(interestedId);
            setConfirmationModalVisible(true);
        };

        return possibleInteresteds.map((interested) => (
            <UserCard
                key={interested._id}
                handleClick={renderClickAction}
                user={interested}
            />
        ));
    };

    const renderNoPossibleInterestedsMessage = () => {
        return (
            <View style={styles.noPossibleInteresteds}>
                <NoPossibleInteresteds
                    title={'Você ainda não possui interessados na ajuda.'}
                />
            </View>
        );
    };

    const renderList = () => {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                {possibleInteresteds.length > 0
                    ? renderPossibleInterestedsList()
                    : renderNoPossibleInterestedsMessage()}
                <ConfirmationModal
                    visible={confirmationModalVisible}
                    setVisible={setConfirmationModalVisible}
                    action={chooseInterested}
                    message={message}
                    isLoading={isChooseRequestLoading}
                />
            </ScrollView>
        );
    };

    return renderList();
}
