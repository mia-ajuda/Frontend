import { StyleSheet } from "react-native";
import fonts from "../../../assets/styles/fontVariable";
import colors from "../../../assets/styles/colorVariables";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  text1: {
    ...fonts.title,
    fontFamily: "montserrat-semibold"
  },
  text2: {
    ...fonts.subtitle
  },
  text3: {
    ...fonts.body
  },
  btn: {
    backgroundColor: colors.danger,
    color: colors.danger
  }
});

export default styles;
