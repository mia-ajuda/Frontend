import { StyleSheet } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import colors from '../../../../assets/styles/colorVariables';
import fonts from '../../../../assets/styles/fontVariable';

export const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: RFValue(48, 640),
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        ...fonts.subtitle,
        color: colors.dark,
        fontFamily: 'montserrat-bold',
    },
    customMenuStyle: {
        backgroundColor: colors.primary,
        padding: RFValue(4, 640),
        marginRight: RFValue(8, 640),
        marginLeft: RFValue(8, 640),
        borderRadius: 100,
    },
});
