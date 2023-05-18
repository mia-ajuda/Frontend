import React from 'react';
import tabTopBarOptions from '../tabTopBarOptions';
import { Text } from 'react-native';

export const screenOptions = ({ route }) => {
    const renderTabText = (text, style) => <Text style={style}>{text}</Text>;

    return {
        tabBarLabel: ({ focused }) => {
            const style = focused
                ? {
                      ...tabTopBarOptions.labelStyle,
                      fontFamily: 'montserrat-bold',
                  }
                : tabTopBarOptions.labelStyle;
            return renderTabText(route.name, style);
        },
    };
};
