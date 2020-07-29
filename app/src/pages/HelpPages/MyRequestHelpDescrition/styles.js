import { StyleSheet } from 'react-native';
import fonts from '../../../../assets/styles/fontVariable';
import colors from '../../../../assets/styles/colorVariables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    waitingToBeAccepted: {
        ...fonts.subtitle,
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 20,
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
    buttonHelpers: {
        width: '100%',
        backgroundColor: colors.primary,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
    },
    textBtn: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    containerBadge: {
        position: 'absolute',
        top: -7,
        right: -6,
    },
    badgeStyle: {
        backgroundColor: colors.danger,
        height: 30,
        width: 30,
        borderRadius: 50,
    },
    labelBadge: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export default styles;
