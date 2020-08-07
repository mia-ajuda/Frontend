import { StyleSheet } from 'react-native';

import colors from '../../../assets/styles/colorVariables';

export default StyleSheet.create({
    cardContainer: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,

        backgroundColor: colors.light,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.primary,
        margin: 10,

        flexDirection: 'row',
        padding: 10,
        width: '45%',
        height: '45%',
    },

    info: {
        alignItems: 'center',
    },

    image: {
        alignContent: 'center',
        width: 50,
        height: 70,
    },

    title: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'center',
    },
});
