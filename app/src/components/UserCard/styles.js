import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import fonts from '../../../assets/styles/fontVariable';

export const styles = StyleSheet.create({
    userCardContainer: {
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    userPhoto: {
        width: RFValue(40, 640),
        height: RFValue(40, 640),
        borderRadius: RFValue(20, 640),
        marginRight: 8,
    },
    userInfo: {
        flexDirection: 'row',
    },
    userName: {
        ...fonts.body,
        fontFamily: 'montserrat-semibold',
    },
    userEmail: {
        ...fonts.small,
    },
});
