import { StyleSheet } from 'react-native';
import fonts from '../../../assets/styles/fontVariable';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    loadingContainer: {
        height: '100%',
        justifyContent: 'center',
    },

    profileImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 50,
        marginHorizontal: 10,
        alignSelf: 'center',
    },

    loading: {
        marginVertical: 20,
    },

    card: {
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 25,
        paddingHorizontal: 25,
        width: '100%',
        marginVertical: 10,
        textAlign: 'center',
    },

    elevation: {
        elevation: 5,
        shadowColor: '#4B8AB9',
    },

    textContainer: {
        flex: 1,
        marginLeft: 20,
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },

    text: {
        ...fonts.body,
        color: '#4B8AB9',
        flex: 1,
        justifyContent: 'space-evenly',
    },
});

export default styles;
