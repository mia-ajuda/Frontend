import { StyleSheet } from 'react-native';
import colors from '../../../../assets/styles/colorVariables';
import font from '../../../../assets/styles/fontVariable';

const styles = StyleSheet.create({
    contentContainer: {
        position: 'relative',
        alignItems: 'center',
    },
    profileImage: {
        borderRadius: 20,
        opacity: 0.5,
        backgroundColor: '#000',
    },
    imageContainer: {
        width: 125,
        height: 125,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userName: {
        fontWeight: '900',
        marginTop: 12,
        ...font.title,
    },
    userSubtitle: {
        fontSize: 18,
        fontFamily: 'montserrat-light',
        color: colors.dark,
        marginBottom: 20,
    },
    buttonsContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },
    wppButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: 160,
        height: 50,
        backgroundColor: '#34A853',
        flexDirection: 'row',
    },
    wppText: {
        color: colors.light,
        width: 100,
        textAlign: 'center',
        fontWeight: '600',
    },
    callButton: {
        width: 110,
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: '#FAFAFA',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
    },
    callText: {
        textAlign: 'center',
        fontWeight: '600',
    },
    phoneNumber: {
        fontSize: 16,
        fontWeight: '600',
    },
    closeButton: {
        alignSelf: 'flex-start',
        position: 'absolute',
        left: '10%',
    },
});

export default styles;
