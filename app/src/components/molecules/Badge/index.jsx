import { View, Text } from 'react-native';
import React from 'react';

export default function Badge({ title }) {
    return (
        <View className="bg-secondary px-2 py-1 rounded-md">
            <Text className="text-xs font-ms-semibold text-black">{title}</Text>
        </View>
    );
}
