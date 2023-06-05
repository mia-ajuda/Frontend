import React from 'react';
import { Image, Text, View } from 'react-native';
import { Divider } from '../../../components/atoms/Divider';

export const FeedbackItem = ({ data }) => {
    return (
        <View className="-mt-2 mb-2 w-full">
            <View className="flex-row mb-2">
                <Image
                    source={{
                        uri: `data:image/png;base64,${data.icon}`,
                    }}
                    className="rounded-full h-10 w-10"
                />
                <View className="flex-1 ml-2">
                    <Text className="font-ms-bold text-black mb-[0.5px]">
                        {data.title}
                    </Text>
                    <Text className="font-ms-regular text-black text-xs">
                        {data.description}
                    </Text>
                </View>
            </View>
            <Divider marginHorizontal={4} />
        </View>
    );
};
