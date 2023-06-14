import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../../../colors';

export const InformativeField = ({
    type = 'informative',
    title = 'Aguardando contato',
    text = '',
}) => {
    const variants = {
        informative: {
            icon: 'info',
            color: 'bg-new_background',
        },
        error: {
            icon: 'cancel',
            color: 'bg-danger-200',
        },
        warning: {
            icon: 'error',
            color: 'bg-secondary-500',
        },
    };
    return (
        <View
            className={`w-full ${variants[type].color} border mt-6 border-gray-contrast rounded-lg`}
        >
            <View className="py-5 px-2 flex-row space-x-2">
                <Icon
                    name={variants[type].icon}
                    size={20}
                    color={colors.black.DEFAULT}
                />
                <View className="pr-3">
                    <Text className="font-ms-bold text-black">{title}</Text>
                    <Text className="font-ms-regular mt-1 text-black">
                        {text}
                    </Text>
                </View>
            </View>
        </View>
    );
};
