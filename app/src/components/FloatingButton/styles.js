import { StyleSheet } from 'react-native';

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
        backgroundColor: '#4B8AB9',

        alignItems: 'center',
        justifyContent: 'center',
    },
    helpButtonView: {
        bottom: 55,
        right: 20,
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
    },
});

export default styles;
