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
    userInfo: {
        flexDirection: 'row',
        maxWidth: RFValue(160, 640),
    },
    userName: {
        ...fonts.body,
        fontFamily: 'montserrat-semibold',
    },
    userEmail: {
        ...fonts.small,
    },
});
