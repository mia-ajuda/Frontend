import { Camera, CameraType } from 'expo-camera';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { DefaultButton } from '../../atoms/DefaultButton';

export const DefaultCamera = ({
    cameraRef,
    handleTakePicture,
    photo,
    setPhoto,
    handleSubmitPhoto,
    preview = false,
}) => {
    const renderCamera = () => (
        <>
            <View className="flex-1 rounded-full w-80 max-h-80 overflow-hidden">
                <Camera
                    ratio="4:3"
                    type={CameraType.front}
                    className="flex-1 w-80 max-h-80"
                    ref={cameraRef}
                />
            </View>
            <DefaultButton
                title="Tirar foto"
                onPress={handleTakePicture}
                margin="mt-4"
            />
        </>
    );

    const renderPhotoPreview = () => (
        <>
            <Text className="font-ms-semibold text-black mb-4 text-xl">
                Essa foto ficou boa?
            </Text>
            <Image
                source={{
                    uri: `data:image/png;base64,${photo.base64}`,
                }}
                className="w-80 h-80 mb-12 rounded-full"
            />
            <View className="flex-1 w-full px-4">
                <DefaultButton
                    title="Salvar"
                    onPress={() => handleSubmitPhoto(photo)}
                    margin="mb-4"
                />
                <DefaultButton
                    variant="secondary"
                    title="Tirar outra"
                    onPress={() => setPhoto(null)}
                />
            </View>
        </>
    );

    return (
        <View className="flex-1 items-center py-8 px-4">
            {photo && preview ? renderPhotoPreview() : renderCamera()}
        </View>
    );
};
