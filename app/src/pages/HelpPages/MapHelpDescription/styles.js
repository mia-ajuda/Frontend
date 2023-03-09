import { StyleSheet } from 'react-native';
import fonts from '../../../../assets/styles/fontVariable';
import helpDescription from '../../../../assets/styles/helpDescription';

const styles = StyleSheet.create({
    ...helpDescription,
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
        paddingTop: 15,
        marginBottom: 50,
    },
    infoTextDescription: {
        fontFamily: 'montserrat-semibold',
        marginTop: 20,
        marginBottom: 10,
    },
    helpInfo: {
        flex: 3,
        paddingTop: 5,
    },
});

export default styles;
