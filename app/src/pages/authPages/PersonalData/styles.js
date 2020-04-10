import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";
import color from "../../../../assets/styles/colorVariables";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.light,
  },
  viewText: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  text1: {
    ...fonts.subtitle,
    fontFamily: "montserrat-semibold",
  },
  inputView: {
    flex: 2,
    width: "90%",
  },
  btnView: {
    width: "90%",
    justifyContent: "center",
    marginBottom: 30,
  },
  inputMask: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    fontFamily: "montserrat-regular",
  },
  valid: {
    borderColor: color.primary,
  },
  invalid: {
    borderColor: color.danger,
  },
  label: {
    fontFamily: "montserrat-semibold",
    color: color.primary,
  },
  viewMargin: {
    marginVertical: 6,
  },
});

export default styles;
