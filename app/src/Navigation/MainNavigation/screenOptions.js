import React from 'react';
import { Dimensions, Text } from 'react-native';
import colors from '../../../colors';
import fonts from '../../../assets/styles/fontVariable';
import { RFValue } from 'react-native-responsive-fontsize';

export const screenOptions = ({ route }) => {
    const renderTabText = (text, style) => <Text style={style}>{text}</Text>;

    return {
        tabBarLabel: ({ focused }) => {
            const commonStyle = {
                ...fonts.body,
                color: colors.dark,
                fontSize: RFValue(14, 640),
                width: Dimensions.get('screen').width * 0.3,
                textAlign: 'center',
            };
            const style = focused
                ? {
                      ...commonStyle,
                      fontFamily: 'montserrat-bold',
                  }
                : commonStyle;
            return renderTabText(route.name, style);
        },
        tabBarStyle: {
            backgroundColor: 'transparent',
            shadowColor: 'transparent',
            borderBottomWidth: 1,
            borderColor: '#BCCBCA',
            paddingHorizontal: 8,
        },
        tabBarIndicatorStyle: {
            backgroundColor: colors.primary.DEFAULT,
            borderRadius: 16,
            padding: 1,
        },
    };
};
