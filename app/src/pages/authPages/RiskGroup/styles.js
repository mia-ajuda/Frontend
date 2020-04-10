import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";
import colors from "../../../../assets/styles/colorVariables";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light,
  },
  viewText: {
    width: "90%",
    justifyContent: "center",
  },
  text1: {
    ...fonts.title,
    fontFamily: "montserrat-semibold",
    marginVertical: 50,
  },
  input: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 0,
  },
  inputItem: {
    marginHorizontal: 6
  },
  btnView: {
    width: "90%",
    justifyContent: "center",
    marginTop: 80
  },
});

export default styles;
