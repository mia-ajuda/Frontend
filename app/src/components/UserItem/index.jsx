import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { untilTwoLastNames } from '../../utils/shortenName';
import { RoundedFullButton } from '../atoms/RoundedFullButton';

const UserItem = ({ user, shouldRenderRoundedFullButton = false, onPress }) => {
    const renderRoundedFullButton = () => {
        return (
            shouldRenderRoundedFullButton && (
                <View className="absolute right-0 z-10 transform -translate-x-1/2 -translate-y-1/2">
                    <RoundedFullButton text="Aceitar" onPress={onPress} />
                </View>
            )
        );
    };

    return (
        <View className="border-[#D2D2D2] border-b-[0.5px] justify-center py-2">
            {renderRoundedFullButton()}
            <TouchableOpacity className="flex-row space-x-3 h-16 w-full items-center">
                <Image
                    className="w-[48] h-[48] rounded-full"
                    source={{
                        uri: `data:image/png;base64,${user.photo}`,
                    }}
                />
                <View>
                    <Text className="text-base font-[montserrat-bold]">
                        {untilTwoLastNames(user.name)}
                    </Text>
                    <Text className="text-base font-[montserrat-light]">
                        {user.address.city}, {user.address.state}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default UserItem;
