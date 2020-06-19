import { StyleSheet } from 'react-native';
import fonts from '../../../../assets/styles/fontVariable';
import colors from '../../../../assets/styles/colorVariables';

const styles = StyleSheet.create({
    input: {
        ...fonts.body,
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
    },
    validInput: {
        borderColor: colors.primary,
    },
    invalidInput: {
        borderColor: colors.danger,
    },
    label: {
        ...fonts.body,
        fontFamily: 'montserrat-semibold',
        color: colors.primary,
    },
});

export default styles;
