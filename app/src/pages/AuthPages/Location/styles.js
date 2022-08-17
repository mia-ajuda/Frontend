import { StyleSheet, Dimensions } from 'react-native';
import fonts from '../../../../assets/styles/fontVariable';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    adjustPositionBox: {
        position: 'absolute',
        backgroundColor: '#fff',
        alignSelf: 'center',
        top: 32,
        width: '90%',
        zIndex: 5,
        padding: 20,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    adjustPositionText: {
        ...fonts.subtitle,
        textAlign: 'center',
    },
    buttons: {
        position: 'absolute',
        zIndex: 5,
        bottom: 0,
        height: SCREEN_HEIGHT * 0.11,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },
    description: {
        width: '90%',
        padding: 30,
        paddingTop: 10,
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 5,
        bottom: SCREEN_HEIGHT * 0.11,
        alignSelf: 'center',
        elevation: 5,
        borderRadius: 10,
    },
    descriptionTextTitle: {
        ...fonts.body,
    },
    descriptionText: {
        ...fonts.body,
        color: '#828c85',
        top: 10,
        marginBottom: 10,
    },
    positionBlueCat: {
        position: 'absolute',
        zIndex: 5,
        top: '43%',
        left: '43%',
    },
    iconBlueCat: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
    },
    descriptionTextAlert: {
        fontFamily: 'montserrat-semibold',
        color: '#e47171',
    },
});

export default styles;
