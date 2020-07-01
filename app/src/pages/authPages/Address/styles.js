import { StyleSheet } from 'react-native';
import fonts from '../../../../assets/styles/fontVariable';
import color from '../../../../assets/styles/colorVariables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
        marginHorizontal: 30,
    },
    scroll: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    scroll1: {
        width: '100%',
    },
    viewText: {
        width: '90%',
        justifyContent: 'center',
        marginBottom: 20,
    },
    text1: {
        ...fonts.subtitle,
        fontFamily: 'montserrat-semibold',
        marginTop: 15,
    },
    inputView: {
        width: '100%',
    },
    btnView: {
        width: '100%',
    },
    inputMask: {
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        fontFamily: 'montserrat-regular',
    },
    valid: {
        borderColor: color.primary,
    },
    invalid: {
        borderColor: color.danger,
    },
    label: {
        fontFamily: 'montserrat-semibold',
        color: color.primary,
    },
    viewMargin: {
        marginVertical: 6,
    },
    toggleView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backIcon: {
        marginTop: 15,
        alignItems: 'flex-start',
    },
});

export default styles;
