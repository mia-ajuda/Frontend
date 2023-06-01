import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

export const CircleIconButton = ({
    icon,
    onPress,
    iconSize = 'base',
    color,
}) => {
    const iconSizeVariant = {
        sm: 16,
        base: 20,
        lg: 24,
        xl: 28,
        '2xl': 32,
    };

    const buttonColor = color ? color : '';

    return (
        <TouchableOpacity onPress={onPress}>
            <View
                className={`p-1 rounded-full border-[#BBBBBB] border-[0.5px] ${buttonColor}`}
            >
                <Icon name={icon} size={iconSizeVariant[iconSize]} />
            </View>
        </TouchableOpacity>
    );
};
