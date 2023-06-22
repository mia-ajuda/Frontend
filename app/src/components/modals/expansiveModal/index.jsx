import React, { useRef, useEffect, useState } from 'react';
import UserItem from '../../UserItem';
import { Text } from 'react-native';
import callService from '../../../services/callService';
import helpService from '../../../services/Help';
import { alertSuccess } from '../../../utils/Alert';
import { BaseBottomSheet } from '../BaseBottomSheet';
import { Dialog } from '../../molecules/Dialog';

export const ExpansiveModal = ({
    setShowModal,
    userList,
    title,
    method,
    helpId,
    setUpdateData,
    confirmationText,
    showButton = false,
}) => {
    const bottomSheetRef = useRef(null);
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [selectedUser, setSelectedUser] = useState(false);

    useEffect(() => {
        bottomSheetRef.current?.present();
    }, []);

    const reachUserLimit = userList.length >= 4;
    const snapPoints = reachUserLimit ? ['55%', '95%'] : ['50%'];

    useEffect(() => {
        if (userList.length <= 0) handleCloseModal();
    }, [userList]);

    const handleCloseModal = () => setShowModal(false);

    const buttonAction = async () => {
        const chooseHelperRequest = await callService(helpService, method, [
            helpId,
            selectedUser,
        ]);
        if (!chooseHelperRequest.error) {
            alertSuccess('Interessado escolhido com sucesso!');
        }
        setConfirmationModalVisible(false);
        handleCloseModal();
        setUpdateData(true);
    };

    const renderClickAction = (selectedUserId) => {
        setSelectedUser(selectedUserId);
        setConfirmationModalVisible(true);
    };

    return (
        <BaseBottomSheet
            bottomSheetRef={bottomSheetRef}
            snapPoints={snapPoints}
            handleCloseModal={handleCloseModal}
            scrollable={reachUserLimit}
        >
            <Dialog
                isVisible={confirmationModalVisible}
                onCloseDialog={() => setConfirmationModalVisible(false)}
                cancelText={'Cancelar'}
                description={confirmationText}
                confirmText={'Confirmar'}
                onConfirmPress={buttonAction}
            />
            <Text className="text-lg -mt-4 mb-4 font-[montserrat-bold] text-center">
                {title}
            </Text>
            {userList.map((user) => (
                <UserItem
                    key={user._id}
                    user={user}
                    showButton={showButton}
                    onPress={() => renderClickAction(user._id)}
                />
            ))}
        </BaseBottomSheet>
    );
};
