import { View, Text } from 'react-native';
import React from 'react';

export default function Badge({ title }) {
    return (
        <View className="bg-secondary p-1 rounded-md">
            <Text className="text-xs font-semibold">{title}</Text>
        </View>
    );
}
