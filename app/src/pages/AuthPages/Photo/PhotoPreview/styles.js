import { StyleSheet } from 'react-native';
import fonts from '../../../../../assets/styles/fontVariable';
import colors from '../../../../../assets/styles/colorVariables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        backgroundColor: colors.light,
    },

    thumbnail: {
        width: 200,
        height: 200,
        borderRadius: 125,
        marginTop: 20,
    },
    text: {
        ...fonts.subtitle,
        fontFamily: 'montserrat-semibold',
        textAlign: 'center',
    },

    hyperLink: {
        ...fonts.subtitle,
        fontSize: 13,
        fontFamily: 'montserrat-semibold',
        textAlign: 'left',
        color: colors.primary,
    },

    buttonPreview: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        alignContent: 'space-between',
        justifyContent: 'space-evenly',
        marginTop: 30,
    },

    selectText: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginVertical: 40,
        width: '75%',
    },

    checkBox: {
        justifyContent: 'center',
        alignContent: 'space-between',
    },
    checkBoxTitle: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
    },
    checkBoxContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkBoxText: {
        fontSize: 13,
        fontFamily: 'montserrat-medium',
    },
});

export default styles;
