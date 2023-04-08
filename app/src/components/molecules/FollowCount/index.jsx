import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const FollowCount = ({ count, type }) => {
    const types = {
        following: 'seguindo',
        followers: 'seguidores',
    };
    return (
        <TouchableOpacity className="flex-row mx-2">
            <Text className="font-bold text-base">{count}</Text>
            <Text className="text-base">{` ${types[type]}`}</Text>
        </TouchableOpacity>
    );
};
