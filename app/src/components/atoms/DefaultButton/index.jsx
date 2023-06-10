import React from 'react';
import { Pressable, Text } from 'react-native';
import tailwindConfig from '../../../../tailwind.config';

export const DefaultButton = ({
    title,
    onPress,
    disabled,
    variant = 'primary',
    size = 'lg',
}) => {
    // the ideia of this buttonSize is to define the button height. The width is determined inside of each DefaultButton parent
    const buttonSize = {
        sm: 'py-1',
        md: 'py-2',
        lg: 'py-3',
    };

    const disabledStyle = disabled && 'opacity-70';

    const variantStyle = {
        transparent: {
            pressableStyle: 'bg-transparent',
            textStyle: 'text-black',
        },
        primary: {
            pressableStyle: 'bg-primary',
            textStyle: 'text-light',
        },
        elevated: {
            pressableStyle: 'bg-white shadow-md shadow-black',
            textStyle: 'text-black font-ms-bold',
        },
    };

    const variantPressableStyle = variantStyle[variant].pressableStyle;
    const variantTextStyle = variantStyle[variant].textStyle;

    return (
        <Pressable
            onPress={onPress}
            className={`w-full rounded-md bg-primary ${variantPressableStyle} ${buttonSize[size]} ${disabledStyle}`}
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
