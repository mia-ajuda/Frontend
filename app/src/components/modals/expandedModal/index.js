import React, { useRef, useEffect } from 'react';
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import UserItem from '../../UserItem';
import { Text, View } from 'react-native';
import { FloatingIconButton } from '../../molecules/FloatingIconButton';

export const ExpandedModal = ({ setShowModal, userList, title }) => {
    const bottomSheetRef = useRef(null);

    useEffect(() => {
        bottomSheetRef.current?.present();
    }, []);

    const renderBackdrop = (props) => (
        <BottomSheetBackdrop
            {...props}
            opacity={0.5}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
        />
    );

    const snapPoints = userList.length >= 4 ? ['50%', '95%'] : ['50%'];

    const handleCloseModal = () => setShowModal(false);

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
                <BottomSheetScrollView>
                    <FloatingIconButton
                        iconName={'close'}
                        onPress={handleCloseModal}
                    />
                    <View className="p-4">
                        <Text className="text-lg mb-4 font-[montserrat-bold] text-center">
                            {title}
                        </Text>
                        {userList.map((helpedUser, index) => (
                            <UserItem key={index} user={helpedUser} />
                        ))}
                    </View>
                </BottomSheetScrollView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
};
