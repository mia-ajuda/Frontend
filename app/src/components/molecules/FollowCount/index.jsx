import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const FollowCount = ({ count, type, userId }) => {
    const navigation = useNavigation();
    const types = {
        following: 'seguindo',
        followers: 'seguidores',
    };

    const handlePress = () => {
        navigation.navigate('followersFollowingPage', {
            selectedProfileId: userId,
            isFollowersPage: types[type] == 'seguidores',
        });
    };

    return (
        <TouchableOpacity className="flex-row mx-2" onPress={handlePress}>
            <Text className="font-ms-bold text-base">{count}</Text>
            <Text className="font-ms-regular text-base">{` ${types[type]}`}</Text>
        </TouchableOpacity>
    );
};
