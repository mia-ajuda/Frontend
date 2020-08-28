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
        top: '52%',
        right: '2.5%',
    },
    contentWarning: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: '43%',
        right: '2.5%',
    },
    icon: {
        right: 45,
        position: 'absolute',
        bottom: 25,
    },
    title: {
        ...fonts.title,
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
        top: '1%',
    },
    categoryText: {
        ...fonts.subtitle,
        marginLeft: 10,
    },
    modalBody: {
        height: '80%',
        marginTop: '45%',
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
    onGoingFinishedButtons: {
        borderRadius: 6,
        borderWidth: 2,
        borderColor: colors.primary,
        height: 40,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        top: '10%',
    },
    info: {
        alignItems: 'center',
        padding: 5,
    },
    infoText: {
        ...fonts.body,
        color: colors.primary,
        fontFamily: 'montserrat-semibold',
    },
    onGoingFinishedButtonsArea: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },
    closeIcon: {
        top: '3%',
        right: 20,
        position: 'absolute',
        zIndex: 5,
    },
    notSelectedCategory: {
        ...fonts.body,
        borderWidth: 1,
        padding: 8,
        borderRadius: 5,
        marginVertical: 5,
        borderColor: colors.primary,
        color: colors.primary,
    },
    unvailableToSelectCategory: {
        ...fonts.body,
        borderWidth: 1,
        padding: 8,
        borderRadius: 5,
        marginVertical: 5,
        borderColor: '#c4c4c4',
        color: '#c4c4c4',
    },
    selectedCategory: {
        ...fonts.body,
        borderWidth: 1,
        padding: 8,
        borderRadius: 5,
        marginVertical: 5,
        borderColor: colors.primary,
        color: '#fff',
        backgroundColor: colors.primary,
    },
    warning: {
        ...fonts.body,
    },
});

export default styles;
