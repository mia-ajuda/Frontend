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
        alignSelf: 'flex-start',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addCategoryText: {
        ...fonts.body,
        color: '#fff',
        fontSize: 18,
    },
    categoryName: {
        backgroundColor: colors.secondary,
        padding: 5,
        elevation: 2,
        margin: 5,
        borderRadius: 2,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 0,
    },
});

export default styles;
