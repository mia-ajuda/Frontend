import React from 'react';
import { Text, View } from 'react-native';

export const DescriptionBox = ({ title, description, maxLines = 4 }) => {
    return (
        <View className="w-full">
            <Text className="absolute text-regular bg-white mx-1 px-1 font-ms-bold z-10 my-2 text-black">
                {title}
            </Text>
            <View className="border border-background py-4 px-2 relative rounded-lg w-full max-h-24 my-4 text-black">
                <Text
                    className="text-xs font-ms-regular"
                    numberOfLines={maxLines}
                >
                    {description}
                </Text>
            </View>
        </View>
    );
};
