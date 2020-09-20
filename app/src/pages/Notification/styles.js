import { StyleSheet } from 'react-native';
import colors from '../../../assets/styles/colorVariables';
import fonts from '../../../assets/styles/fontVariable';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        backgroundColor: colors.primary,
        height: '13%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerText: {
        marginTop: '8%',
        ...fonts.title,
        color: colors.light,
        fontSize: 24,
    },

    notificationList: {
        height: '100%',
        paddingHorizontal: 15,
        paddingBottom: 15,
    },

    noNotifications: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        paddingTop: '40%',
        padding: 20,
    },

    emptyListImage: {
        resizeMode: 'contain',
        width: 200,
        height: 200,
    },

    emptyListText: {
        ...fonts.title,
        color: Colors.primary,
        marginTop: 10,
        textAlign: 'center',
        fontSize: 22,
    },

    loadingContainer: {
        height: '100%',
        justifyContent: 'center',
    },
});

export default styles;
