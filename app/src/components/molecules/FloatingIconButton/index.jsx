import React from 'react';
import { View } from 'react-native';
import { CircleIconButton } from '../../atoms/CircleIconButton';

export const FloatingIconButton = ({
    position = 'left',
    iconName,
    onPress,
}) => {
    const convertPosition = `${position}-2`;
    return (
        <View className={`absolute top-2 ${convertPosition}`}>
            <CircleIconButton icon={iconName} onPress={onPress} />
        </View>
    );
};
