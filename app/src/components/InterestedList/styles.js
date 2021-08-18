import { StyleSheet } from 'react-native';
import colors from '../../../assets/styles/colorVariables';

export default StyleSheet.create({
    container: {
        padding: 15,
    },
    interested: {
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
    noPossibleInteresteds: {
        flex: 1,
        height: '100%',
        marginTop: '30%',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
