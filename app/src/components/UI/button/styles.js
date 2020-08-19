import { StyleSheet } from 'react-native';
import fonts from '../../../../assets/styles/fontVariable';
import colors from '../../../../assets/styles/colorVariables';

const text = {
    ...fonts.subtitle,
    textAlign: 'center',
    fontFamily: 'montserrat-medium',
};

const btn = {
    paddingHorizontal: 10,
    paddingVertical: 12,
    elevation: 1,
    borderRadius: 4,
    marginVertical: 8,
};

const styles = StyleSheet.create({
    textWhite: { ...text, color: colors.dark },
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
});

export default styles;
