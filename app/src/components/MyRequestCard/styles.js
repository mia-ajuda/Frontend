import { StyleSheet } from 'react-native';

import colors from '../../../assets/styles/colorVariables';

export default StyleSheet.create({
    deleteIcon: {
        position: 'absolute',
        bottom: 20,
        right: 10,
    },
    labelBadge: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    badgeStyle: {
        backgroundColor: colors.danger,
        height: 30,
        width: 30,
        borderRadius: 50,
    },

    containerBadge: {
        position: 'absolute',
        top: -7,
        right: -6,
    },
});
