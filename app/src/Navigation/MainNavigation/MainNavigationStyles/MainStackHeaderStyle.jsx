import React from 'react';
import { Image, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import backImage from '../../../../assets/images/back.png';
import colors from '../../../../assets/styles/colorVariables';
import fonts from '../../../../assets/styles/fontVariable';

const headerStyle = {
    headerBackImage: () => (
        <Image
            source={backImage}
            style={{
                flex: 1,
                resizeMode: 'contain',
                width: 10,
                marginLeft: 5,
            }}
        />
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
