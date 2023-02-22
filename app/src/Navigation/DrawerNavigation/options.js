import React from 'react';
import { Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '../../../assets/styles/colorVariables';

export const drawerNavigationOptions = {
    headerStyle: {
        backgroundColor: colors.primary,
    },
    headerTintColor: '#fff',

    drawerActiveTintColor: colors.dark,
    drawerInactiveTintColor: colors.dark,
    drawerLabelStyle: {
        fontFamily: 'montserrat-regular',
        fontSize: RFValue(16, 640),
    },
    drawerActiveBackgroundColor: colors.primaryLowOpacity,
    drawerType: 'back',
};

export const drawerScreenOptions = (screenName, icon, family = 'material') => {
    return {
        headerTitle: screenName,
        title: screenName,
        drawerIcon: () => (
            <Icon name={icon} color={colors.dark} type={family} />
        ),
    };
};
