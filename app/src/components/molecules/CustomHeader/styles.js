import { StyleSheet } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import colors from '../../../../assets/styles/colorVariables';
import fonts from '../../../../assets/styles/fontVariable';

export const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: RFValue(80, 640),
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        ...fonts.title,
        color: colors.light,
        fontFamily: 'montserrat-bold',
    },
});
