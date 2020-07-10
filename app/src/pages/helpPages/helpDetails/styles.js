import { StyleSheet } from 'react-native';
import fonts from '../../../../assets/styles/fontVariable';

const styles = StyleSheet.create({
    ownerPhoto: {
        width: 120,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 60,
        marginVertical: 20,
        alignSelf: 'center',
    },
    text: {
        ...fonts.body,
    },
    name: {
        ...fonts.subtitle,
        fontWeight: 'bold',
    },
    title: {
        ...fonts.title,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    userInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    description: {
        marginTop: 30,
        alignSelf: 'flex-start',
    },
    loadingArea: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;
