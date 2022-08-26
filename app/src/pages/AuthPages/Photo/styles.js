import { StyleSheet } from 'react-native';
import fonts from '../../../../assets/styles/fontVariable';
import colors from '../../../../assets/styles/colorVariables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        backgroundColor: colors.light,
    },
    logo: {
        flex: 1,
        alignItems: 'center',
    },
    pickPhotoButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerText: {
        ...fonts.body,
        fontSize: 14,
    },
    button: {
        backgroundColor: '#c4c4c4',
        width: 60,
        height: 60,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        ...fonts.subtitle,
        fontFamily: 'montserrat-semibold',
        textAlign: 'center',
    },

    textView: {
        flex: 6,
        margin: 16,
        alignItems: 'flex-start',
    },
    btnView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 40,
        flexDirection: 'row',
    },

    backIcon: {
        alignItems: 'flex-start',
        marginTop: 5,
    },
});

export default styles;
