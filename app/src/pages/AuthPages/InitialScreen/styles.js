import { StyleSheet } from 'react-native';
import colors from '../../../../assets/styles/colorVariables';

const styles = StyleSheet.create({
    initialScreenContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.primary,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        paddingHorizontal: 24,
    },
    logo: {
        marginTop: 80,
        height: '20%',
        resizeMode: 'contain',
        marginBottom: 64,
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        color: 'white',
        fontWeight: '600',
        fontFamily: 'montserrat-medium',
        marginBottom: 24,
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'montserrat-regular',
    },
    buttonsContainer: {
        marginTop: 'auto',
        width: '100%',
        marginBottom: 16,
    },
});

export default styles;
