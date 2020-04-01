import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";
import colors from "../../../../assets/styles/colorVariables";

const styles = StyleSheet.create({
  input: {
    ...fonts.body,
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.primary,
    paddingLeft: 10
  },
  label: {
    ...fonts.body,
    fontFamily: "montserrat-semibold",
    color: colors.primary
  }
});

export default styles;
