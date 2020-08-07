import { StyleSheet } from 'react-native';
import fonts from '../../../assets/styles/fontVariable';
import colors from '../../../assets/styles/colorVariables';
const styles = StyleSheet.create({
    addCategory: {
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderColor: colors.primary,
        padding: 5,
        marginTop: 20,
        width: '40%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addCategoryText: {
        ...fonts.body,
        color: '#fff',
        fontSize: 18,
    },
});

export default styles;
