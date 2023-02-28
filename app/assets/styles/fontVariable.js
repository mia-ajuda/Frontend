import colors from './colorVariables';
import { RFValue } from 'react-native-responsive-fontsize';

const minimumTextSize = 14;
const fontFamily = 'montserrat-regular';
const defaultProps = {
    color: colors.dark,
    fontFamily: fontFamily,
};

const fonts = {
    title: {
        ...defaultProps,
        fontSize: RFValue(minimumTextSize * 1.5, 640),
    },
    subtitle: {
        ...defaultProps,
        fontSize: RFValue(minimumTextSize * 1.2, 640),
    },
    body: {
        ...defaultProps,
        fontSize: RFValue(minimumTextSize, 640),
    },

    small: {
        ...defaultProps,
        fontSize: RFValue(minimumTextSize * 0.75, 640),
    },
};

export default fonts;
