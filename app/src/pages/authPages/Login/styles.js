import { StyleSheet } from 'react-native';
import colors from '../../../../assets/styles/colorVariables';
import fonts from '../../../../assets/styles/fontVariable';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    logo: {
        marginTop: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    input: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
    },

    textInput: {
        ...fonts.body,
        borderBottomWidth: 2,
        borderBottomColor: colors.light,
        color: colors.light,
        marginVertical: 20,
        width: '100%',
    },
    forgotPassword: {
        justifyContent: 'flex-end',
    },
    forgotPasswordOrientation: {
        alignSelf: 'flex-end',
    },
    forgotPasswordtext: {
        ...fonts.body,
        marginHorizontal: 20,
        marginBottom: 20,
        color: colors.light,
    },
    viewBtn: {
        alignItems: 'center',
        flex: 1,
    },
    login: {
        width: '90%',
    },
    signupText: {
        ...fonts.body,
        color: colors.light,
        fontFamily: 'montserrat-semibold',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        fontSize: 18,
    },
    logoImage: {
        flex: 1,
        resizeMode: 'contain',
    },
});

export default styles;
