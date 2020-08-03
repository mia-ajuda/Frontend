import { StyleSheet } from 'react-native';
import colors from '../../../assets/styles/colorVariables';

const styles = StyleSheet.create({
    plusButtonView: {
        bottom: 55,
        right: 20,
        position: 'absolute',
        zIndex: 3,
    },
    plusButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.primary,

        alignItems: 'center',
        justifyContent: 'center',
    },
    helpButtonView: {
        bottom: 55,
        right: 25,
        position: 'absolute',
        zIndex: 2,
        alignItems: 'center',
        flexDirection: 'row',
    },
    helpButton: {
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    helpButtonText: {
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        paddingVertical: 3,
        fontFamily: 'montserrat-semibold',
    },
});

export default styles;
