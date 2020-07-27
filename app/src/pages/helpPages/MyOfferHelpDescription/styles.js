import { StyleSheet } from 'react-native';
import fonts from '../../../../assets/styles/fontVariable';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    userInfo: {
        flex: 1,
        flexDirection: 'row',
    },
    profileImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 50,
        marginHorizontal: 10,
        alignSelf: 'center',
    },
    infoTextView: {
        alignSelf: 'center',
        marginLeft: 40,
        paddingRight: 100,
    },
    infoText: {
        ...fonts.body,
        marginBottom: 3,
    },
    infoTextFont: {
        fontFamily: 'montserrat-semibold',
    },
    infoTextBottom: {
        marginBottom: 50,
    },
    infoTextDescription: {
        fontFamily: 'montserrat-semibold',
        marginTop: 20,
        marginBottom: 10,
    },
    helpInfo: {
        flex: 3,
        justifyContent: 'space-between',
        padding: 20,
    },

    helpButtons: {
        flex: 1,
    },

    ViewLink: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    ViewLinkBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    waitingText: {
        ...fonts.subtitle,
        textAlign: 'center',
        alignSelf: 'center',
    },
});

export default styles;
