import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '../../../../assets/styles/colorVariables';
import fonts from '../../../../assets/styles/fontVariable';

const styles = StyleSheet.create({
    drawer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        ...fonts.title,
        width: RFValue(90, 640),
        marginLeft: RFValue(24, 640),
        fontFamily: 'montserrat-bold',
        color: colors.primary,
        fontSize: RFValue(24, 640),
    },
    footer: {
        marginTop: 'auto',
    },
});

export default styles;
