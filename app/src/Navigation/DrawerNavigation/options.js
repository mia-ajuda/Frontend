import React from 'react';
import { TouchableOpacity } from 'react-native';
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
};

export const drawerScreenOptions = (
    screenName,
    icon,
    headerShown = true,
    family = 'material',
) => {
    return {
        headerTitle: screenName,
        title: screenName,
        headerShown: headerShown,
        drawerIcon: () => (
            <Icon name={icon} color={colors.dark} type={family} />
        ),
    };
};

export const showDrawerButtonInStackOption = ({ navigation }) => ({
    headerLeft: () => (
        <TouchableOpacity
            style={{ padding: 14 }}
            onPress={() => navigation.openDrawer()}
        >
            <Icon name="menu" color={colors.light} />
        </TouchableOpacity>
    ),
});
