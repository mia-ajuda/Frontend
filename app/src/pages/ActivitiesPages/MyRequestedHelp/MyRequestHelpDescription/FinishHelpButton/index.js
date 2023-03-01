import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import Button from '../../../../../components/UI/button';
import HelpService from '../../../../../services/Help';
import ConfirmationModal from '../../../../../components/modals/confirmationModal';
import { UserContext } from '../../../../../store/contexts/userContext';
import { alertSuccess } from '../../../../../utils/Alert';
import callService from '../../../../../services/callService';

export default function FinishHelpButton({ help }) {
    const navigation = useNavigation();
    const { user } = useContext(UserContext);
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [isFinishHelpRequestLoading, setFinishHelpRequestLoading] =
        useState(false);
    const goBackToMyResquestsPage = () =>
        navigation.reset({
            index: 0,
            routes: [{ name: 'activities' }],
        });
    async function finishHelpByOwner() {
        setFinishHelpRequestLoading(true);
        const finishHelpRequest = await callService(
            HelpService,
            'finishHelpByOwner',
            [help._id, user._id],
        );
        if (!finishHelpRequest.error) {
            alertSuccess(
                'Ajuda finalizada com sucesso! Aguarde a confirmação do ajudado!',
            );
        }
        setFinishHelpRequestLoading(false);
        setConfirmationModalVisible(false);
        goBackToMyResquestsPage();
    }
    return (
        <View>
            <Button
                press={() => setConfirmationModalVisible(true)}
                title="Finalizar Ajuda"
                large
            />
            <ConfirmationModal
                visible={confirmationModalVisible}
                setVisible={setConfirmationModalVisible}
                action={finishHelpByOwner}
                message={
                    'Você tem certeza que deseja finalizar este pedido de ajuda?'
                }
                isLoading={isFinishHelpRequestLoading}
            />
        </View>
    );
}
