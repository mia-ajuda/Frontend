import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export const TextButton = ({ text, onPress, className }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text
                className={`font-ms-bold text-primary text-base ${className}`}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};
