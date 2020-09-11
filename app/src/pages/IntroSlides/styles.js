import { StyleSheet } from 'react-native';
import colors from '../../../assets/styles/colorVariables';

const styles = StyleSheet.create({
    buttonBox: {
        backgroundColor: 'transparent',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    buttonText: {
        color: colors.primary,
        marginHorizontal: 20,
        fontFamily: 'montserrat-semibold',
        fontSize: 15,
    },
    titles: {
        marginTop: '2%',
        color: colors.primary,
        fontFamily: 'montserrat-semibold',
    },
    images: {
        paddingBottom: '1%',
    },
    subtitle: {
        marginTop: 0,
        color: colors.dark,
        fontFamily: 'montserrat-semibold',
    },
});

export default styles;
