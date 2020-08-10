import { StyleSheet } from 'react-native';
import colors from '../../../../assets/styles/colorVariables';

const minimumTextSize = 16;

const styles = StyleSheet.create({
    modalContent: {
        width: '80%',
        height: '80%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        elevation: 5,
        borderRadius: 15,
        top: '6.5%',
        padding: 16,
    },
    modalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: 15,
    },
    closeIcon: {
        top: '5.5%',
        right: 20,
        position: 'absolute',
        zIndex: 5,
    },
    arrowIcon: {
        right: 20,
        position: 'absolute',
        zIndex: 5,
    },
    title: {
        alignSelf: 'center',
        marginBottom: 10,
        fontFamily: 'montserrat-semibold',
        color: colors.primary,
        fontSize: minimumTextSize * 1.5,
    },

    modalBody: {
        marginTop: 25,
        height: '80%',
    },
    textButtons: {
        borderWidth: 1,
        borderRadius: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
    textContent: {
        alignSelf: 'center',
        marginBottom: 10,
        fontFamily: 'montserrat-semibold',
        color: colors.light,
        fontSize: minimumTextSize,
    },
});

export default styles;
