import colors from './colorVariables';
import { RFValue } from 'react-native-responsive-fontsize';

const minimumTextSize = 16;
const fontFamily = 'montserrat-regular';

const fonts = {
    title: {
        color: colors.dark,
        fontFamily: fontFamily,
        fontSize: RFValue(minimumTextSize * 1.5, 640),
    },
    subtitle: {
        color: colors.dark,
        fontFamily: fontFamily,
        fontSize: RFValue(minimumTextSize * 1.2, 640),
    },
    body: {
        color: colors.dark,
        fontFamily: fontFamily,
        fontSize: RFValue(minimumTextSize, 640),
    },
};

export default fonts;
