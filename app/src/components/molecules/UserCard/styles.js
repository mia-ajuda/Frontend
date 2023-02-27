import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import fonts from '../../../../assets/styles/fontVariable';

export const styles = StyleSheet.create({
    userCardContainer: {
        marginBottom: RFValue(16, 640),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: RFValue(12, 640),
    },
    userPhoto: {
        width: RFValue(40, 640),
        height: RFValue(40, 640),
        borderRadius: RFValue(20, 640),
        marginRight: RFValue(8, 640),
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
