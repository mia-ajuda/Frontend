import { StyleSheet } from 'react-native';
import colors from '../../../../assets/styles/colorVariables';

const minimumTextSize = 16;

const styles = StyleSheet.create({
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        top: '10.5%',
        borderRadius: 15,
        padding: 16,
    },

    modalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },

    contentHeader: {
        flexDirection: 'column',
    },

    closeIcon: {
        alignSelf: 'flex-end',
    },

    arrowIcon: {
        right: 20,
        position: 'absolute',
        zIndex: 5,
    },

    title: {
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'montserrat-semibold',
        color: colors.primary,
        fontSize: minimumTextSize * 1.5,
    },

    modalBody: {
        marginTop: 25,
        height: '80%',
    },

    textButtons: {
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.primary,
    },

    textContent: {
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'montserrat-semibold',
        color: colors.light,
        fontSize: minimumTextSize,
    },
});

export default styles;
