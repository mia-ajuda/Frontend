import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import UserItem from '../../UserItem';
import { Text, View } from 'react-native';
import { FloatingIconButton } from '../../molecules/FloatingIconButton';
import ConfirmationModal from '../confirmationModal';
import callService from '../../../services/callService';
import helpService from '../../../services/Help';
import { alertSuccess } from '../../../utils/Alert';

export const ExpandedModal = ({
    setShowModal,
    userList,
    title,
    method,
    helpId,
    setUpdateData,
}) => {
    const bottomSheetRef = useRef(null);
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [isChooseRequestLoading, setChooseRequestLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(false);

    useEffect(() => {
        bottomSheetRef.current?.present();
    }, []);

    const renderBackdrop = useCallback(
        // This is throwing a memory leak error, but according to the community, it's a problem with React 16.x.
        (props) => (
            <BottomSheetBackdrop
                {...props}
                opacity={0.5}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                pressBehavior="close"
            />
        ),
        [],
    );

    const snapPoints = userList.length >= 4 ? ['55%', '95%'] : ['50%'];

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
        setUpdateData(true);
        setConfirmationModalVisible(false);
    };

    const renderClickAction = (selectedUserId) => {
        setSelectedUser(selectedUserId);
        setConfirmationModalVisible(true);
    };

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onDismiss={handleCloseModal}
                backdropComponent={renderBackdrop}
                enablePanDownToClose
                handleComponent={null}
                overDragResistanceFactor={7}
            >
                <ConfirmationModal
                    visible={confirmationModalVisible}
                    setVisible={setConfirmationModalVisible}
                    action={buttonAction}
                    message={'Você deseja ajudar esse usuário?'}
                    isLoading={isChooseRequestLoading}
                />
                <BottomSheetScrollView scrollEnabled={userList.length >= 4}>
                    <FloatingIconButton
                        iconName={'close'}
                        onPress={handleCloseModal}
                    />
                    <View className="p-4">
                        <Text className="text-lg mb-4 font-[montserrat-bold] text-center">
                            {title}
                        </Text>
                        {userList.map((user) => (
                            <UserItem
                                key={user._id}
                                user={user}
                                showButton={title === 'Possíveis ajudados'}
                                onPress={() => renderClickAction(user._id)}
                            />
                        ))}
                    </View>
                </BottomSheetScrollView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
};
