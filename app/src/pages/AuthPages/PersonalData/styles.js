import { StyleSheet } from 'react-native';
import fonts from '../../../../assets/styles/fontVariable';
import color from '../../../../assets/styles/colorVariables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 30,
        backgroundColor: color.light,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    formScroll: {
        width: '100%',
    },
    scrollContainerOnTyping: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    viewText: {
        width: '90%',
        justifyContent: 'center',
        marginBottom: 20,
    },
    text1: {
        ...fonts.subtitle,
        fontFamily: 'montserrat-semibold',
        marginVertical: 15,
    },
    inputView: {
        flex: 1,
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
        marginTop: 10,
    },
    switchLabel: {
        fontFamily: 'montserrat-semibold',
        color: color.primary,
    },

    viewMargin: {
        marginVertical: 6,
    },
    toggleView: {
        marginTop: 10,
        marginBottom: 45,
        alignItems: 'center',
    },
    switchViewEntity: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    switchViewMentalHelthProfessional: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    backIcon: {
        alignItems: 'flex-start',
    },
    errorMessage: {
        ...fonts.body,
        alignSelf: 'center',
        marginBottom: 10,
        color: 'red',
    },
});

export default styles;
