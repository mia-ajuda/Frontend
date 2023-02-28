import { StatusBar, StyleSheet } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import colors from '../../../../assets/styles/colorVariables';
import fonts from '../../../../assets/styles/fontVariable';

export const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: StatusBar.currentHeight + RFValue(48, 640),
        backgroundColor: colors.primary,
        justifyContent: 'flex-end',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: RFValue(8, 640),
    },
    title: {
        ...fonts.subtitle,
        color: colors.light,
        fontFamily: 'montserrat-bold',
    },
});
