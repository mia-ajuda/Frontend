import { StyleSheet } from 'react-native';

import colors from '../../../assets/styles/colorVariables';
import fonts from '../../../assets/styles/fontVariable';

const cardContainerStyle = {
    maxWidth: 740,
    maxHeight: 240,
    marginTop: 20,
    borderWidth: 1,
    backgroundColor: colors.light,
    borderRadius: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
    paddingTop: 10,
};

export default StyleSheet.create({
    cardContainer: {
        borderColor: 'rgba(0,0,0,0.1)',
        ...cardContainerStyle,
    },
    cardContainerRiskGroup: {
        borderRightWidth: 10,
        borderRightColor: colors.danger,
        borderLeftColor: 'rgba(0,0,0,0.1)',
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderTopColor: 'rgba(0,0,0,0.1)',
        ...cardContainerStyle,
    },

    cardTitle: {
        maxWidth: '100%',
        maxHeight: '30%',
    },

    titleContent: {
        ...fonts.title,
        fontFamily: 'montserrat-semibold',
        color: colors.primary,

        lineHeight: 30,
        textAlign: 'center',
    },

    categoryWarning: {
        backgroundColor: colors.secondary,
        borderRadius: 8,
        maxHeight: 30,
        paddingHorizontal: 15,
        marginTop: 17,
    },

    categoryName: {
        ...fonts.body,
        fontFamily: 'montserrat-semibold',
        lineHeight: 30,
        textAlign: 'center',
    },
});
