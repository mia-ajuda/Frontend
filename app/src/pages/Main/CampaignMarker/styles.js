import { StyleSheet } from 'react-native';
import fonts from '../../../../assets/styles/fontVariable';
import colors from '../../../../assets/styles/colorVariables';
const styles = StyleSheet.create({
    callout: {
        width: 150,
        padding: 10,
        alignItems: 'center',
    },
    calloutPersonName: {
        ...fonts.body,
        fontSize: 12,
    },
    calloutGroupRiskText: {
        ...fonts.body,
        fontSize: 14,
        color: colors.danger,
    },
    calloutPress: {
        ...fonts.body,
        fontFamily: 'montserrat-semibold',
        fontSize: 12,
    },
});

export default styles;
