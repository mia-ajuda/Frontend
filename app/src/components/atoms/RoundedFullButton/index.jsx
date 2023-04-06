import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export const RoundedFullButton = ({ text, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text className="bg-primary px-7 py-2 rounded-full text-white text-sm">
                {text}
            </Text>
        </TouchableOpacity>
    );
};
