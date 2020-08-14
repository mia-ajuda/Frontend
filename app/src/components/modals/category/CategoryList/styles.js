import { StyleSheet } from 'react-native';
import fonts from '../../../../../assets/styles/fontVariable';
import colors from '../../../../../assets/styles/colorVariables';
const minimumTextSize = 16;
const styles = StyleSheet.create({
    modalContent: {
        width: '80%',
        height: '80%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        elevation: 5,
        borderRadius: 15,
        top: '6.5%',
        padding: 16,
    },
    modalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: '75%',
    },
    icon: {
        right: 20,
        position: 'absolute',
        bottom: 25,
    },
    title: {
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: 30,
        fontFamily: 'montserrat-semibold',
        color: colors.primary,
        fontSize: minimumTextSize * 1.2,
    },
    categoryText: {
        ...fonts.subtitle,
        marginLeft: 10,
    },
    modalBody: {
        marginTop: '70%',
    },
    filterButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    contentButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        top: '45%',
    },
    helpFilterButton: {
        flex: 1,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: colors.primary,
        width: 40,
        height: 100,
        marginHorizontal: 1,
    },
    info: {
        alignItems: 'center',
    },
    infoText: {
        ...fonts.body,
        color: colors.primary,
    },
});

export default styles;
