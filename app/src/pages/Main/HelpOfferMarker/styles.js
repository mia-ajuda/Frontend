import { StyleSheet } from 'react-native';
import fonts from '../../../../assets/styles/fontVariable';

const styles = StyleSheet.create({
    helpOfferMarker: {
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    callout: {
        width: 150,
        padding: 10,
        alignItems: 'center',
    },
    calloutPersonName: {
        ...fonts.body,
        fontSize: 12,
        color: '#777',
    },
    calloutTitle: {
        ...fonts.subtitle,
        fontSize: 14,
    },

    calloutPress: {
        ...fonts.body,
        fontFamily: 'montserrat-semibold',
        fontSize: 12,
    },
});

export default styles;
