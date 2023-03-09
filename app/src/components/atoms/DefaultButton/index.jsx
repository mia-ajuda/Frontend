import React from 'react';
import { Pressable, Text } from 'react-native';
import colors from '../../../../assets/styles/colorVariables';

export const DefaultButton = ({
    title,
    onPress,
    disabled,
    customStyle = '',
}) => {
    return (
        <Pressable
            onPress={onPress}
            className={`w-full py-3 rounded-md bg-primary ${customStyle}`}
            disabled={disabled}
            android_ripple={{ color: colors.primaryContrast }}
        >
            <Text className="text-center text-light font-[montserrat-semibold] text-lg">
                {title}
            </Text>
        </Pressable>
    );
};
