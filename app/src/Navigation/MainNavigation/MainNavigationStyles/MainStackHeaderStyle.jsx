import React from 'react';
import { Image, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '../../../../assets/styles/colorVariables';
import fonts from '../../../../assets/styles/fontVariable';

const headerStyle = {
    headerBackImage: () => (
        <Icon name='arrow-back' color={colors.light} size={RFValue(20, 640)}/>
    ),
    headerStyle: {
        height: StatusBar.currentHeight + RFValue(36, 640),
        backgroundColor: colors.primary,
        elevation: 0,
    },
    headerTitleStyle: {
        ...fonts.subtitle,
        color: colors.light,
        fontFamily: 'montserrat-bold'
    },
    headerTintColor: colors.light,
    headerTitleAlign: 'left',
};

export default headerStyle;
