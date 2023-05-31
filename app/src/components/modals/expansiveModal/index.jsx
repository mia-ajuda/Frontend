import React, { useRef, useEffect, useState } from 'react';
import UserItem from '../../UserItem';
import { Text } from 'react-native';
import ConfirmationModal from '../confirmationModal';
import callService from '../../../services/callService';
import helpService from '../../../services/Help';
import { alertSuccess } from '../../../utils/Alert';
import { BaseBottomSheet } from '../BaseBottomSheet';

export const ExpansiveModal = ({
    setShowModal,
    userList,
    title,
    method,
    helpId,
    setUpdateData,
    showButton = false,
}) => {
    const bottomSheetRef = useRef(null);
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [isChooseRequestLoading, setChooseRequestLoading] = useState(false);
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
        setChooseRequestLoading(true);
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
            <ConfirmationModal
                visible={confirmationModalVisible}
                setVisible={setConfirmationModalVisible}
                action={buttonAction}
                message={'Você deseja oferecer ajuda a esse usuário?'}
                isLoading={isChooseRequestLoading}
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
