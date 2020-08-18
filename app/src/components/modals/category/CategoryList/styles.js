import { StyleSheet } from 'react-native';
import fonts from '../../../../../assets/styles/fontVariable';
import colors from '../../../../../assets/styles/colorVariables';
const minimumTextSize = 16;
const styles = StyleSheet.create({
    modalContent: {
        width: '90%',
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
        top: '60%',
        right: '2.5%',
    },
    icon: {
        right: 45,
        position: 'absolute',
        bottom: 25,
    },
    categoryTitle: {
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: 30,
        fontFamily: 'montserrat-semibold',
        color: colors.dark,
        fontSize: minimumTextSize * 1.2,
    },
    filterTitle: {
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'montserrat-semibold',
        color: colors.dark,
        fontSize: minimumTextSize * 1.5,
        top: '3%',
    },
    categoryText: {
        ...fonts.subtitle,
        marginLeft: 10,
    },
    modalBody: {
        marginTop: '55%',
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
    },
    infoText: {
        ...fonts.body,
        color: colors.primary,
        fontFamily: 'montserrat-semibold',
        marginTop: 10,
    },
    infoTextInst: {
        ...fonts.body,
        color: colors.primary,
        fontSize: 11,
        marginTop: 20,
        fontFamily: 'montserrat-semibold',
    },
    closeIcon: {
        top: '5.5%',
        right: 20,
        position: 'absolute',
        zIndex: 5,
    },
});

export default styles;
