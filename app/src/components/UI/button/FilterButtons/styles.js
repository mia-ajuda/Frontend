import { StyleSheet } from 'react-native';
import fonts from '../../../../../assets/styles/fontVariable';
import colors from '../../../../../assets/styles/colorVariables';

const styles = StyleSheet.create({
    contentButtons: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
    },
    helpFilterButton: {
        flex: 1,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: colors.primary,
        height: 100,
        marginHorizontal: 5,
        justifyContent: 'space-around',
    },
    info: {
        alignItems: 'center',
        padding: 5,
        height: '100%',
        justifyContent: 'center',
    },
    infoPress: {
        backgroundColor: colors.primary,
        alignItems: 'center',
        padding: 5,
        height: '100%',
        justifyContent: 'center',
    },
    infoText: {
        ...fonts.body,
        color: colors.primary,
        fontFamily: 'montserrat-semibold',
        fontSize: 11,
        textAlign: 'center',
    },
    infoPressText: {
        ...fonts.body,
        color: colors.light,
        fontFamily: 'montserrat-semibold',
        fontSize: 11,
        textAlign: 'center',
    },
});

export default styles;
