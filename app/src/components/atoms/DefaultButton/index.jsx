import React from 'react';
import { Pressable, Text } from 'react-native';

export const DefaultButton = ({
    title,
    onPress,
    disabled,
    customStyle = '',
    textStyle = '',
}) => {
    return (
        <Pressable
            onPress={onPress}
            className={`w-full py-3 rounded-md bg-primary ${customStyle}`}
            disabled={disabled}
            android_ripple={{ color: '#D2D2D2' }}
        >
            <Text
                className={`text-center text-light font-ms-semibold text-lg ${textStyle}`}
            >
                {title}
            </Text>
        </Pressable>
    );
};
