import { StyleSheet } from 'react-native';
import colors from '../../../assets/styles/colorVariables';
const styles = StyleSheet.create({
    tag: {
        backgroundColor: colors.secondary,
        borderRadius: 8,
        maxHeight: 30,
        paddingHorizontal: 15,
        alignSelf: 'center',
        elevation: 1,
    },
    text: {
        fontFamily: 'montserrat-semibold',
        lineHeight: 30,
        textAlign: 'center',
    },
});

export default styles;
