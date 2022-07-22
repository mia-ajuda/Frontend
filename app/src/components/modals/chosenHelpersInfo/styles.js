import { StyleSheet } from 'react-native';
import colors from '../../../../assets/styles/colorVariables';
import font from '../../../../assets/styles/fontVariable';

const styles = StyleSheet.create({
    contentContainer: {
        position: 'relative',
        alignItems: 'center',
    },
    imageContainer: {
        width: 125,
        height: 125,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
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
        marginVertical: 12,
    },
    wppButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: 160,
        paddingVertical: 8,
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
        width: 120,
        paddingHorizontal: 26,
        paddingVertical: 8,
        backgroundColor: '#f0f0f0',
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
