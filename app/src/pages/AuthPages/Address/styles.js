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
    scrollContainer: {
        justifyContent: 'center',
    },
    formScrollContainer: {
        width: '100%',
    },
    viewText: {
        width: '90%',
        justifyContent: 'center',
        marginBottom: 20,
    },
    pageDescription: {
        ...fonts.subtitle,
        fontFamily: 'montserrat-semibold',
        marginBottom: 20,
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
        alignItems: 'flex-start',
        marginVertical: 10,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scroll: { width: '100%' },
});

export default styles;
