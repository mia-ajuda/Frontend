import { StyleSheet } from 'react-native';
import colors from '../../../assets/styles/colorVariables';

export default StyleSheet.create({
    createNewOfferButtonView: {
        bottom: 16,
        right: 8,
        position: 'absolute',
        zIndex: 3,
    },
    plusButton: {
        width: 150,
        height: 50,
        flexDirection: 'row',
        borderRadius: 25,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    plusButtonText: {
        color: '#fff',
        fontWeight: '700',
        padding: 8,
    },
});
