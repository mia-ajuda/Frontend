import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

export const Dialog = ({
    isVisible,
    onCloseDialog,
    title,
    description,
    cancelText,
    animationType = 'slide',
    confirmText = 'Ok',
    onCofirmPress,
}) => {
    return (
        <Modal
            visible={isVisible}
            onRequestClose={onCloseDialog}
            animationType={animationType}
            transparent
        >
            <View className="flex-1 w-screen h-screen backdrop-blur-sm bg-black/30 items-center justify-center px-6">
                <View className="bg-light rounded-xl p-6 min-w-full">
                    {title && (
                        <Text className="font-ms-semibold text-black text-left pb-4">
                            {title}
                        </Text>
                    )}
                    <Text className="font-ms-regular text-black text-left pb-6">
                        {description}
                    </Text>
                    <View className="flex flex-row justify-end">
                        {cancelText && (
                            <Pressable onPress={onCloseDialog}>
                                <Text className="text-primary font-ms-semibold mr-10">
                                    {cancelText}
                                </Text>
                            </Pressable>
                        )}
                        <Pressable onPress={onCofirmPress}>
                            <Text className="text-primary font-ms-semibold">
                                {confirmText}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
