import React from 'react';
import { Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '../../../assets/styles/colorVariables';

export const drawerNavigationOptions = {
    headerStyle: {
        backgroundColor: colors.primary,
    },
    headerTintColor: colors.light,

    drawerActiveTintColor: colors.dark,
    drawerInactiveTintColor: colors.dark,
    drawerLabelStyle: {
        fontFamily: 'montserrat-regular',
        fontSize: RFValue(16, 640),
    },
    drawerActiveBackgroundColor: colors.primaryLowOpacity,
};

export const drawerScreenOptions = (screenName, icon, family = 'material') => {
    return {
        headerTitle: screenName,
        title: screenName,
        headerShown: false,
        drawerIcon: () => (
            <Icon name={icon} color={colors.dark} type={family} />
        ),
    };
};
