import React from 'react';
import { Pressable, Text } from 'react-native';
import tailwindConfig from '../../../../tailwind.config';

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
            android_ripple={{
                color: tailwindConfig.theme.extend.colors.gray.contrast,
            }}
        >
            <Text
                className={`text-center text-light font-ms-semibold text-lg ${variantTextStyle}`}
            >
                {title}
            </Text>
        </Pressable>
    );
};
