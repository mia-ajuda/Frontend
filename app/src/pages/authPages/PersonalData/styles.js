import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";
import color from "../../../../assets/styles/colorVariables";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 30
  },
  scroll: {
    flexGrow : 1, 
    justifyContent : 'center', 
  },
  viewText: {
    width: "90%",
    justifyContent: "center",
    marginBottom: 20,
  },
  text1: {
    ...fonts.subtitle,
    fontFamily: "montserrat-semibold",
    marginTop: 15
  },
  inputView: {
    width: "100%",
  },
  btnView: {
    width: "90%",
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
