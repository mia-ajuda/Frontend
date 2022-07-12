import { StyleSheet } from 'react-native';
import fonts from '../../../../assets/styles/fontVariable';
import colors from '../../../../assets/styles/colorVariables';

import { RFValue } from 'react-native-responsive-fontsize';

const text = {
    ...fonts.subtitle,
    textAlign: 'center',
    fontFamily: 'montserrat-semibold',
    fontSize: RFValue(16, 640),
};

const btn = {
    paddingHorizontal: 10,
    paddingVertical: 12,
    elevation: 1,
    borderRadius: 4,
    marginVertical: 8,
    justifyContent: 'center',
};

const styles = StyleSheet.create({
    textWhite: { ...text, color: colors.primary },
    btnWhite: { ...btn, backgroundColor: colors.light },
    textDanger: { ...text, color: colors.light },
    btnDanger: { ...btn, backgroundColor: colors.danger },
    textWarning: { ...text, color: colors.dark },
    btnWarning: { ...btn, backgroundColor: colors.secondary },
    textDefault: {
        ...text,
        color: colors.light,
    },
    btnDefault: {
        ...btn,
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    textDisabled: { ...text, color: '#666' },
    btnDisabled: {
        ...btn,
        backgroundColor: '#ccc',
        elevation: 0,
        borderColor: '#ccc',
        borderWidth: 2,
    },
    textNotSelected: { ...text, color: colors.primary },
    btnNotSelected: {
        ...btn,
        backgroundColor: colors.light,
        elevation: 0,
        borderBottomColor: colors.primary,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: colors.primary,
    },
    textOutlined: { ...text, color: colors.light },
    btnOutlined: {
        ...btn,
        elevation: 0,
        borderBottomColor: colors.light,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: colors.light,
    },
});

export default styles;
