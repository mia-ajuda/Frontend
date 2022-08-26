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
        margin: 8,

        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
        width: '45%',
    },

    info: {
        alignItems: 'center',
    },

    title: {
        fontSize: 12,
        marginTop: 10,
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'center',
    },
});
