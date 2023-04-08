import { StyleSheet } from 'react-native';
import fonts from '../../../../assets/styles/fontVariable';

export const styles = StyleSheet.create({
    notFoundContainer: {
        flex: 1,
        alignItems: 'center',
    },
    notFoundTitle: {
        ...fonts.subtitle,
        fontFamily: 'montserrat-semibold',
        textAlign: 'center',
    },
    notFoundText: {
        ...fonts.body,
        textAlign: 'center',
    },
});
