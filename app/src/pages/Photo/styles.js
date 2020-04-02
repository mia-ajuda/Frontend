import { StyleSheet } from "react-native";
import colors from "../../../assets/styles/colorVariables";
import fonts from "../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    ...fonts.body,
    color: colors.primary
  },
  button: {
    ...fonts.title,
    color: colors.dark
  }
});

export default styles;
