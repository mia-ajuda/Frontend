import React from 'react';
import { View } from 'react-native';
import { CircleIconButton } from '../../atoms/CircleIconButton';

export const FloatingIconButton = ({
    position = 'left',
    iconName,
    onPress,
    customTop = null,
    iconSize,
    color,
}) => {
    const convertPosition = `${position}-2`;
    const positionY = customTop || 'top-2';
    return (
        <View className={`absolute z-10 ${positionY} ${convertPosition}`}>
            <CircleIconButton
                icon={iconName}
                onPress={onPress}
                iconSize={iconSize}
                color={color}
            />
        </View>
    );
};
