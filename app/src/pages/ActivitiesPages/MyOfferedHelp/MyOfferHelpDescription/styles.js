import { StyleSheet } from 'react-native';
import fonts from '../../../../../assets/styles/fontVariable';
import helpDescription from '../../../../../assets/styles/helpDescription';

const styles = StyleSheet.create({
    ...helpDescription,
    viewOffer: {
        height: '100%',
    },
    scrollViewOffer: {
        flexGrow: 1,
    },
    viewBackdrop: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.6)',
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
    inline: {
        flexDirection: 'row',
    },
    btnArrow: {
        position: 'absolute',
        right: 5,
    },
    smallBadge: {
        height: 25,
        width: 25,
    },
    smallMargin: {
        marginBottom: 10,
    },
    noPaddingBottom: {
        paddingBottom: 0,
    },
    noFlex: {
        flex: 0,
    },
});

export default styles;
