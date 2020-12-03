import { StyleSheet, Dimensions } from 'react-native';
import fonts from '../../../../../assets/styles/fontVariable';
import colors from '../../../../../assets/styles/colorVariables';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const minimumTextSize = 16;

const adjustResponsive = {
    height: '100%',
    marginTop: 0,
};
const normalDimensions = {
    height: '80%',
    marginTop: '20.5%',
};
const styles = StyleSheet.create({
    modalContent: {
        width: '90%',
        ...(SCREEN_HEIGHT < 650 ? adjustResponsive : normalDimensions),
        backgroundColor: '#fff',
        alignSelf: 'center',
        elevation: 5,
        borderRadius: 15,
        padding: 16,
    },
    modalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    contentHeader: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentWarning: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: '43%',
        right: '2.5%',
    },
    icon: {},
    title: {
        ...fonts.title,
    },
    categoryTitle: {
        fontFamily: 'montserrat-semibold',
        color: colors.dark,
        marginRight: 10,
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
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    info: {
        alignItems: 'center',
        padding: 5,
    },
    infoText: {
        ...fonts.body,
        color: colors.primary,
        fontFamily: 'montserrat-semibold',
        fontSize: 14,
    },
    onGoingFinishedButtonsArea: {
        marginTop: 10,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
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
