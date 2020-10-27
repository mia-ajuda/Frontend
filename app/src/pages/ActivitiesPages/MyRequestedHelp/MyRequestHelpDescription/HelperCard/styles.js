import { StyleSheet } from 'react-native';
import colors from '../../../../../../assets/styles/colorVariables';
import fonts from '../../../../../../assets/styles/fontVariable';

export default StyleSheet.create({
    container: {
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
    listPossibleHelpers: {
        flex: 1,
        width: '100%',
        paddingVertical: 20,
    },
    helper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 15,
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: 4,
        marginBottom: 10,
    },
    imageProfile: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginRight: 15,
        borderColor: colors.primary,
        borderWidth: 3,
    },
    infoText: {
        fontSize: 15,
    },
    infoTextFont: {
        fontFamily: 'montserrat-semibold',
    },
    badgeStyle: {
        backgroundColor: colors.danger,
        height: 30,
        width: 30,
        borderRadius: 50,
    },
    containerBadge: {
        position: 'absolute',
        top: -7,
        right: -6,
    },
    labelBadge: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    wrapperNoHelperWarn: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textNoHelpers: {
        ...fonts.subtitle,
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    volunteerContainer: {
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#FFF',
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: 4,
    },
    volunteerImage: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginRight: 15,
    },
    textVolunteer: {
        ...fonts.subtitle,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    volunteerContainerDirection: {
        flexDirection: 'row',
    },
    volunteerText: {
        width: '80%',
    },
    volunteerName: {
        flexWrap: 'wrap',
    },
});
