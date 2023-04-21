import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { untilTwoLastNames } from '../../utils/shortenName';
import { RoundedFullButton } from '../atoms/RoundedFullButton';

const UserItem = ({ user, showButton = false, onPress }) => {
    const navigation = useNavigation();
    const renderRoundedFullButton = () => {
        return (
            showButton && (
                <View className="absolute right-0 z-10 transform -translate-x-1/2 -translate-y-1/2">
                    <RoundedFullButton text="Aceitar" onPress={onPress} />
                </View>
            )
        );
    };

    const navigateToUserProfile = () => {
        navigation.navigate('socialUserProfile', {
            userId: user._id,
        });
    };

    return (
        <View className="border-[#D2D2D2] border-b-[0.5px] justify-center py-2">
            {renderRoundedFullButton()}
            <Pressable
                className="flex-row space-x-3 h-16 w-full items-center"
                android_ripple={{ color: '#F2F2F2' }}
                onPress={() => navigateToUserProfile()}
            >
                <Image
                    className="w-[48] h-[48] rounded-full"
                    source={{
                        uri: `data:image/png;base64,${user.photo}`,
                    }}
                />
                <View>
                    <Text
                        className="text-base font-ms-bold w-36"
                        numberOfLines={1}
                    >
                        {untilTwoLastNames(user.name)}
                    </Text>
                    <Text className="text-base font-ms-light">
                        {user.address.city}, {user.address.state}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};

export default UserItem;
