import { StyleSheet } from 'react-native';
import colors from '../../../../../assets/styles/colorVariables';
import fonts from '../../../../../assets/styles/fontVariable';

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: colors.light,
        padding: 20,
        borderRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalText: {
        ...fonts.subtitle,
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 30,
    },
    backdrop: {
        backgroundColor: '#35353590',
    },
});

export default styles;
