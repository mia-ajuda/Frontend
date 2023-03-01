import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { untilTwoLastNames } from '../../utils/shortenName';

const UserItem = ({ user }) => {
    return (
        <View className="border-[#D2D2D2] border-b-[0.5px] mb-4">
            <TouchableOpacity className="flex-row space-x-3 h-16">
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
