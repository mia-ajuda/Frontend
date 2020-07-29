import { StyleSheet } from 'react-native';
import colors from '../../../assets/styles/colorVariables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    text: {
        fontFamily: 'montserrat-medium',
        marginTop: 20,
        color: '#fff',
        fontSize: 18,
    },
});

export default styles;
