import { StyleSheet } from 'react-native';
import colors from '../../../../../assets/styles/colorVariables';
import fonts from '../../../../../assets/styles/fontVariable';
import { Dimensions } from 'react-native';
const { height: screen_height } = Dimensions.get('window');

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
        elevation: 5,
        alignSelf: 'center',
        marginTop: screen_height * 0.3,
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
