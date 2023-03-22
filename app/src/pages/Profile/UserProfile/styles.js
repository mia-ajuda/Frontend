import { StyleSheet } from 'react-native';
import colors from '../../../../assets/styles/colorVariables';
import font from '../../../../assets/styles/fontVariable';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    imageView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    imageContainer: {
        width: 175,
        height: 175,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        borderRadius: 100,
        opacity: 0.5,
        backgroundColor: '#000',
    },
    viewSec: {
        backgroundColor: '#000000',
        width: '100%',
        height: '100%',
        borderRadius: 100,
        opacity: 0.3,
    },
    viewContent: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        marginBottom: 10,
        paddingVertical: 15,
    },
    viewInput: {
        width: '100%',
        margin: 10,
        justifyContent: 'flex-start',
    },
    labelInput: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 18,
    },
    inputWrapper: {
        borderWidth: 3,
        borderColor: colors.primary,
        marginTop: 10,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textInput: {
        fontWeight: '700',
        ...font.body,
    },
    buttonWrapper: {
        marginTop: 30,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    followerFollowingContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
});

export default styles;
