import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../assets/styles/colorVariables';

const styles = StyleSheet.create({
    buttonBox: {
        backgroundColor: 'transparent',
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
    image: {
        width: (Dimensions.get('window').width * 100) / 100,
        height: (Dimensions.get('window').height * 40) / 100,
        resizeMode: 'contain',
    },
});

export default styles;
