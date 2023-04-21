import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export const RoundedFullButton = ({
    text,
    onPress,
    variant = 'primary',
    disabled = false,
    width,
}) => {
    const variantStyles = {
        primary: 'bg-primary text-white',
        secondary: 'bg-white text-primary border border-1 border-primary',
        danger: 'bg-danger text-white',
        warning: 'bg-warning text-black',
    };

    const selectedVariant = variantStyles[variant];

    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <Text
                className={`${selectedVariant} ${width} px-7 py-2 rounded-full text-sm font-ms-semibold text-center`}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};
