import { StyleSheet, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '../../../../assets/styles/colorVariables';
import fonts from '../../../../assets/styles/fontVariable';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    drawer: {
        flex: 1,
    },
    drawerContainer: {
        flex: 1,
        height: height,
        justifyContent: 'space-between',
    },
    header: {
        height: height * 0.1,
        flexDirection: 'row',
        marginVertical: RFValue(24, 640),
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
        marginBottom: 24,
    },
});

export default styles;
