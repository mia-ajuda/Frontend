import colors from './colorVariables';
import { RFValue } from 'react-native-responsive-fontsize';

const helpDescription = {
    container: {
        flex: 1,
        padding: 20,
        zIndex: -1,
    },
    userInfo: {
        flex: 1,
        flexDirection: 'row',
    },
    profileImage: {
        width: 70,
        height: 70,
        resizeMode: 'cover',
        borderRadius: 50,
        marginHorizontal: 10,
        alignSelf: 'center',
        position: 'absolute',
    },
    infoTextView: {
        alignSelf: 'center',
        marginLeft: 40,
        paddingRight: 100,
    },
    infoTitle: {
        fontSize: RFValue(16, 640),
        fontFamily: 'montserrat-semibold',
    },
    infoText: {
        fontSize: RFValue(14, 640),
        fontFamily: 'montserrat-regular',
        textAlign: 'justify',
    },
    infoTextFont: {
        fontFamily: 'montserrat-semibold',
    },
    infoTextDescription: {
        fontFamily: 'montserrat-semibold',
        marginTop: 20,
        marginBottom: 10,
    },
    helpInfo: {
        flex: 1,
        paddingHorizontal: 16,
    },
    buttonInteresteds: {
        width: '100%',
        backgroundColor: colors.primary,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
    },
    textBtn: {
        color: '#FFF',
        fontSize: RFValue(16, 640),
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
    titleFont: {
        fontFamily: 'montserrat-semibold',
    },
    categoryWarning: {
        backgroundColor: colors.secondary,
        borderRadius: 8,
        maxHeight: 30,
        paddingHorizontal: 15,
        alignSelf: 'center',
        marginLeft: 5,
        marginTop: 5,
    },

    categoryName: {
        fontSize: RFValue(12, 640),
        fontFamily: 'montserrat-semibold',
        lineHeight: 30,
        textAlign: 'center',
        alignSelf: 'center',
    },
    categoryContainer: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 32,
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
};

export default helpDescription;
