import React from 'react';
import { Text, View } from 'react-native';
import { ProfilePhoto } from '../../molecules/ProfilePhoto';

export function BordedScreenLayout({
    children,
    size = 'md',
    additionalStyles,
    photo,
    displayName,
}) {
    const screenOptions = {
        sm: 'mt-2',
        md: 'mt-10',
        lg: 'mt-14',
    };
    return (
        <View
            className={`bg-white rounded-t-3xl px-[26] py-6 ${screenOptions[size]} ${additionalStyles} flex-1`}
        >
            {photo && (
                <ProfilePhoto
                    size={'md'}
                    base64={photo}
                    className={'absolute z-50 -top-10 right-1/2'}
                />
            )}
            {displayName && (
                <Text
                    className="font-ms-bold text-black text-lg text-center"
                    numberOfLines={1}
                >
                    {displayName}
                </Text>
            )}
            {children}
        </View>
    );
}
