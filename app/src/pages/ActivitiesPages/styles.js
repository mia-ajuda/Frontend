import { StyleSheet } from 'react-native';
import colors from '../../../assets/styles/colorVariables';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    helpList: {
        paddingHorizontal: 15,
        marginBottom: 15,
    },

    tabContainer: {
        backgroundColor: colors.primary,
    },

    tabLabel: {
        color: colors.light,
    },

    tabIndicator: {
        backgroundColor: colors.light,
        padding: 2,
    },
});

export default styles;
