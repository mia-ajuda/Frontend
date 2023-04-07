import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

export const CircleIconButton = ({ icon, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View className="p-1 rounded-full border-[#BBBBBB] border-[0.5px] ">
                <Icon name={icon} size={20} />
            </View>
        </TouchableOpacity>
    );
};
