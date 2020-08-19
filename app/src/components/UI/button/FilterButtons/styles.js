import { StyleSheet } from 'react-native';
import fonts from '../../../../../assets/styles/fontVariable';
import colors from '../../../../../assets/styles/colorVariables';

const styles = StyleSheet.create({
    contentButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        top: '30%',
    },
    helpFilterButton: {
        flex: 1,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: colors.primary,
        height: 130,
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
        marginTop: 10,
        fontSize: 11,
    },
    infoPressText: {
        ...fonts.body,
        color: colors.light,
        fontFamily: 'montserrat-semibold',
        marginTop: 10,
        fontSize: 11,
    },
});

export default styles;
