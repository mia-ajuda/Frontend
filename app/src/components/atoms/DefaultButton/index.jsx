import React from 'react';
import { Pressable, Text } from 'react-native';

export const DefaultButton = ({
    title,
    onPress,
    disabled,
    variant = 'primary',
}) => {
    const variantStyle = {
        transparent: {
            pressableStyle: 'bg-transparent',
            textStyle: 'text-black',
        },
        primary: {
            pressableStyle: 'bg-primary',
            textStyle: 'text-light',
        },
    };

    const variantPressableStyle = variantStyle[variant].pressableStyle;
    const variantTextStyle = variantStyle[variant].textStyle;

    return (
        <Pressable
            onPress={onPress}
            className={`w-full py-3 rounded-md bg-primary ${variantPressableStyle}`}
            disabled={disabled}
            android_ripple={{ color: '#D2D2D2' }}
        >
            <Text
                className={`text-center text-light font-ms-semibold text-lg ${variantTextStyle}`}
            >
                {title}
            </Text>
        </Pressable>
    );
};
