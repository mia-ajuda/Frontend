import { StyleSheet } from 'react-native';
import colors from '../../../../assets/styles/colorVariables';
import font from '../../../../assets/styles/fontVariable';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
    contentContainer: {
        height: '100%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: 125,
        height: 125,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    userName: {
        fontWeight: '900',
        marginTop: 12,
        ...font.title,
        textAlign: 'center',
    },
    userSubtitle: {
        fontSize: RFValue(18, 640),
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
        fontSize: RFValue(16, 640),
        fontWeight: '600',
    },
});

export default styles;
