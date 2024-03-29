import { StyleSheet } from 'react-native';
import fonts from '../../../../assets/styles/fontVariable';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },

    profileInfoContainer: {
        flex: 2,
        flexDirection: 'row',
    },
    profileCardContainer: {
        flex: 5,
    },

    smallerInfoContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
    },

    nameAndFollowButtonContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    followerFollowingContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },

    name: {
        flex: 1,
        ...fonts.body,
        color: '#4B8AB9',
        fontSize: 18,
        flexWrap: 'wrap',
    },

    followerFollowingText: {
        ...fonts.body,
        color: '#4B8AB9',
    },

    profileInfo: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 60,
        marginHorizontal: 10,
        alignSelf: 'center',
    },

    text: {
        ...fonts.body,
        color: '#4B8AB9',
        paddingRight: 10,
    },

    cardContainer: {
        flex: 5,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
    },
});

export default styles;
