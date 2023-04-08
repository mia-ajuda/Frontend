import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export const TextSwitchButton = ({ text, isSelected, onPress }) => {
    const style = {
        container: isSelected ? 'bg-white' : 'bg-transparent',
        text: isSelected ? ' text-primary font-semibold' : '',
    };
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`${style.container} px-6 py-1 w-1/2 rounded-full`}
        >
            <Text className={`${style.text} text-center text-base`}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};
