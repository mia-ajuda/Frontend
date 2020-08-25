import { StyleSheet, Dimensions } from 'react-native';
const { height: screen_height } = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
    },
    modalContent: {
        marginTop: screen_height * 0.2,
        marginHorizontal: 30,
        backgroundColor: '#fff',
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
});

export default styles;
