import colors from "./colorVariables";

const minimumTextSize = 16;
const fontFamily = "montserrat-regular";

const fonts = {
  title: {
    color: colors.dark,
    fontFamily: fontFamily,
    fontSize: minimumTextSize * 1.5
  },
  subtitle: {
    color: colors.dark,
    fontFamily: fontFamily,
    fontSize: minimumTextSize * 1.3
  },
  body: {
    color: colors.dark,
    fontFamily: fontFamily,
    fontSize: minimumTextSize
  }
};

export default fonts;
