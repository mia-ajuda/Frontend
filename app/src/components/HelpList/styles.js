import { StyleSheet } from 'react-native';

import colors from '../../../assets/styles/colorVariables';
import fonts from '../../../assets/styles/fontVariable';

export default StyleSheet.create({
    helpListContainer: {
        width: '100%',
        marginBottom: 16,
        paddingHorizontal: 8,
    },

    listContent: {
        width: '90%',
        alignSelf: 'center',
    },

    buttonStyle: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconDescription: {
        paddingHorizontal: 16,
        color: '#fff',
        fontWeight: '700',
    },
    scrollStyle: {
        paddingBottom: 15,
    },
    emptyListText: {
        ...fonts.title,
        color: colors.light,
        marginTop: 10,
    },
    emptyListImage: {
        resizeMode: 'contain',
        width: 100,
        height: 100,
    },
    emptyList: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: 60,
    },

    filter: {
        width: 48,
        height: 48,
        backgroundColor: '#F7EF6E',
        padding: 16,
        borderRadius: 100,
        elevation: 5,
        marginBottom: 8,
        alignSelf: 'flex-end',
    },
});
