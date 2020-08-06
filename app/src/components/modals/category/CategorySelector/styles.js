import { StyleSheet, Dimensions } from 'react-native';
const { height: screen_height } = Dimensions.get('window');
import colors from '../../../../../assets/styles/colorVariables';
import fonts from '../../../../../assets/styles/fontVariable';
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '80%',
        height: screen_height * 0.6,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    title: {
        ...fonts.subtitle,
        alignSelf: 'center',
        marginBottom: 20,
    },
    notSelectedCategory: {
        ...fonts.body,
        borderWidth: 1,
        padding: 8,
        borderRadius: 5,
        marginVertical: 5,
        borderColor: colors.primary,
        color: colors.primary,
    },
    selectedCategory: {
        ...fonts.body,
        borderWidth: 1,
        padding: 8,
        borderRadius: 5,
        marginVertical: 5,
        borderColor: colors.primary,
        color: '#fff',
        backgroundColor: colors.primary,
    },
});

export default styles;
