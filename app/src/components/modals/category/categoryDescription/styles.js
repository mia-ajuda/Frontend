import { StyleSheet } from 'react-native';
import fonts from '../../../../../assets/styles/fontVariable';

const styles = StyleSheet.create({
    modalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
        paddingTop: 50,
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 50,
        borderRadius: 20,
        top: '2.5%',
    },
    title: {
        ...fonts.title,
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 10,
        fontFamily: 'montserrat-semibold',
    },
    description: {
        ...fonts.body,
        marginBottom: 10,
    },
    icon: {
        top: '5.5%',
        right: 20,
        position: 'absolute',
        zIndex: 5,
    },
});

export default styles;
