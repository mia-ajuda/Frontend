import { StyleSheet } from 'react-native';
import colors from '../../../../assets/styles/colorVariables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    helpList: {
        marginLeft: 15,
        marginRight: 15,
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
