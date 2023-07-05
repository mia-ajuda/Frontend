import React from 'react';
import { View } from 'react-native';

export const ViewWithDivider = ({ children }) => {
    return <View className="border-b border-b-gray-200 py-4">{children}</View>;
};
