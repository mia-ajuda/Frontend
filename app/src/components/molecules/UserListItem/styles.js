import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import fonts from '../../../../assets/styles/fontVariable';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 16,
    },
    image: {
        width: RFValue(54, 640),
        height: RFValue(54, 640),
        borderRadius: 24,
    },
    userInfo: {
        marginRight: 'auto',
        marginLeft: 8,
    },
    userName: {
        ...fonts.subtitle,
        fontFamily: 'montserrat-semibold',
    },
});
