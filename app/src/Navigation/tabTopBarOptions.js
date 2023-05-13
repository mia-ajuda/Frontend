import { Dimensions } from 'react-native';
import colors from '../../assets/styles/colorVariables';
import fonts from '../../assets/styles/fontVariable';
import { RFValue } from 'react-native-responsive-fontsize';

const tabTopBarOptions = {
    style: {
        backgroundColor: 'transparent',
        shadowColor: 'transparent',
        borderBottomWidth: 1,
        borderColor: '#BCCBCA',
        paddingHorizontal: 8,
    },
    labelStyle: {
        ...fonts.body,
        color: colors.dark,
        fontSize: RFValue(16, 640),
        width: Dimensions.get('screen').width * 0.25,
        textAlign: 'center',
    },
    indicatorStyle: {
        backgroundColor: colors.primary,
        borderRadius: 16,
        padding: 1,
    },
};

export default tabTopBarOptions;
