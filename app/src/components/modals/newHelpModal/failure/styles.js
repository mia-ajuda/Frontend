import { StyleSheet } from 'react-native';
import fonts from '../../../../../assets/styles/fontVariable';
import colors from '../../../../../assets/styles/colorVariables';

const styles = StyleSheet.create({
    view: {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    margiView: {
        marginVertical: 12,
    },
    btnContainer: {
        height: '25%',
    },
    input: {
        ...fonts.body,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: colors.primary,
        padding: 10,
    },
    picker: {
        ...fonts.body,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: colors.primary,
    },
    pikerItem: {
        ...fonts.body,
        color: colors.primary,
    },
    label: {
        ...fonts.body,
        fontFamily: 'montserrat-semibold',
        color: colors.primary,
    },

    loading: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
    },
});

export default styles;
