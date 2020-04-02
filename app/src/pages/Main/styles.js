import { StyleSheet } from "react-native";
import fonts from "../../../assets/styles/fontVariable";
import colors from "../../../assets/styles/colorVariables";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f7f7f7"
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
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export default styles;
