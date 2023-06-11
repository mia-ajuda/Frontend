import React from 'react';
import { Modal, View } from 'react-native';
import { FloatingIconButton } from '../../molecules/FloatingIconButton';

export const BaseModal = ({
    isVisible,
    animationType = 'fade',
    children,
    onCloseModal,
    background = 'bg-white',
}) => {
    return (
        <Modal
            visible={isVisible}
            onRequestClose={onCloseModal}
            animationType={animationType}
            transparent
        >
            <View className="flex-1 w-screen h-screen backdrop-blur-sm bg-black/30 items-center justify-center px-6">
                <View
                    className={`${background} rounded-lg px-6 pt-8 pb-6 w-full`}
                >
                    <FloatingIconButton
                        iconName={'close'}
                        onPress={onCloseModal}
                    />
                    {children}
                </View>
            </View>
        </Modal>
    );
};
