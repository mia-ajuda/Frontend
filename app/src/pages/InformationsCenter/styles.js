import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import colors from '../../../assets/styles/colorVariables';
import fonts from '../../../assets/styles/fontVariable';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },

    header: {
        backgroundColor: colors.primary,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerText: {
        ...fonts.title,
        color: colors.light,
        fontSize: 22,
    },

    loadingContainer: {
        height: '100%',
        justifyContent: 'center',
    },
});

export default styles;
