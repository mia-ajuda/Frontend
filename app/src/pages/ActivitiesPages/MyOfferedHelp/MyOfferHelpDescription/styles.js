import { StyleSheet } from 'react-native';
import fonts from '../../../../../assets/styles/fontVariable';
import helpDescription from '../../../../../assets/styles/helpDescription';

const styles = StyleSheet.create({
    ...helpDescription,
    ViewLink: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    ViewLinkBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    waitingText: {
        ...fonts.subtitle,
        textAlign: 'center',
        alignSelf: 'center',
        backgroundColor: '#FFA726',
        borderRadius: 8,
        padding: 5,
        color: 'white',
    },
    loadingContainer: {
        height: '100%',
        justifyContent: 'center',
    },
    helpedUsers: {
        marginTop: 20,
    },
});

export default styles;
