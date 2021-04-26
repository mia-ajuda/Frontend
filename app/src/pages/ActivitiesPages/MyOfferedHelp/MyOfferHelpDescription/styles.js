import { StyleSheet } from 'react-native';
import fonts from '../../../../../assets/styles/fontVariable';
import colors from '../../../../../assets/styles/colorVariables';

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
        backgroundColor: '#FFA726',
        borderRadius: 8,
        padding: 5,
        color: 'white',
    },
    titleFont: {
        fontFamily: 'montserrat-semibold',
        fontSize: 18,
        textAlign: 'center',
        paddingBottom: 10,
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
        ...fonts.body,
        fontFamily: 'montserrat-semibold',
        lineHeight: 30,
        textAlign: 'center',
        alignSelf: 'center',
    },
    categoryContainer: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 15,
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
});

export default styles;
