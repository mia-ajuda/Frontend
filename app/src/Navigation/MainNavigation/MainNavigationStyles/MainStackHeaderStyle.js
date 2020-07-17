import React from 'react';
import { Image } from 'react-native';
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
        height: 90,
        backgroundColor: colors.primary,
        elevation: 0,
    },
    headerTitleStyle: {
        ...fonts.title,
        color: colors.light,
        fontFamily: 'montserrat-medium',
        marginHorizontal: 30,
    },
    headerTintColor: colors.light,
    headerTitleAlign: 'center',
};

export default headerStyle;
