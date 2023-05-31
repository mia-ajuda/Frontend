import React from 'react';
import { Pressable, Text } from 'react-native';
import tailwindConfig from '../../../../tailwind.config';
import { Icon } from 'react-native-elements';
import colors from '../../../../colors';

export const DefaultButton = ({
    title,
    onPress,
    disabled,
    icon,
    variant = 'primary',
    size = 'w-full',
}) => {
    const variantStyle = {
        transparent: {
            pressableStyle: 'bg-transparent',
            textStyle: 'text-black',
            iconColor: colors.black.DEFAULT,
        },
        primary: {
            pressableStyle: 'bg-primary',
            textStyle: 'text-light',
            iconColor: colors.light,
        },
        secondary: {
            pressableStyle: 'bg-white',
            textStyle: 'text-black',
            iconColor: colors.black.DEFAULT,
        },
    };

    let { pressableStyle, textStyle, iconColor } = variantStyle[variant];
    textStyle = icon ? `${textStyle} ml-1` : textStyle;

    return (
        <Pressable
            onPress={onPress}
            className={`flex-row items-center justify-center ${size} py-3 rounded-md bg-primary ${pressableStyle}`}
            disabled={disabled}
            android_ripple={{
                color: tailwindConfig.theme.extend.colors.gray.contrast,
            }}
        >
            {icon && (
                <Icon
                    name={icon.name}
                    type={icon.type}
                    color={iconColor}
                    size={20}
                />
            )}
            <Text
                className={`text-center text-light font-ms-semibold text-lg ${textStyle}`}
            >
                {title}
            </Text>
        </Pressable>
    );
};
