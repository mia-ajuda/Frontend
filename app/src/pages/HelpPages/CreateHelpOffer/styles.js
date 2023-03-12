import { StyleSheet } from 'react-native';
import fonts from '../../../../assets/styles/fontVariable';
import colors from '../../../../assets/styles/colorVariables';

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
        marginTop: 20,
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
    catagoryPicker: {
        marginTop: 20,
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
    descriptionInput: {
        marginTop: 20,
    },
});

export default styles;
