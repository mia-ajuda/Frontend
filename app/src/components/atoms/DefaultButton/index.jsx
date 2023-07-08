import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../../../colors';

export const DefaultButton = ({
    title,
    onPress,
    disabled,
    icon,
    variant = 'primary',
    size = 'lg',
    width = 'w-full',
    isLoading = false,
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
        elevated: {
            pressableStyle: 'bg-white shadow-md shadow-black',
            textStyle: 'text-black-900 font-ms-bold',
        },
    };

    let { pressableStyle, textStyle, iconColor } = variantStyle[variant];
    textStyle = icon ? `${textStyle} ml-1` : textStyle;

    return (
        <Pressable
            onPress={onPress}
            className={`rounded-md bg-primary ${width} ${pressableStyle} ${buttonSize[size]} ${disabledStyle} flex-row justify-center items-center`}
            disabled={disabled}
            android_ripple={{
                color: colors.gray.contrast,
            }}
        >
            {isLoading ? (
                <ActivityIndicator size={28} color={colors.background} />
            ) : (
                <>
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
                </>
            )}
        </Pressable>
    );
};
