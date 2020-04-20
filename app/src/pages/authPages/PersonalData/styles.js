import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";
import color from "../../../../assets/styles/colorVariables";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: color.light,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
  },
  scroll2: {
    marginTop: 40,
    flexGrow: 1,
    justifyContent: "center",
  },
  viewText: {
    width: "90%",
    justifyContent: "center",
    marginBottom: 20,
  },
  text1: {
    ...fonts.subtitle,
    fontFamily: "montserrat-semibold",
    marginTop: 15,
  },
  inputView: {
    width: "100%",
  },
  btnView: {
    width: "100%",
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
  toggleView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backIcon: {
    alignItems: "flex-start",
    marginTop: 15,
  },
  errorMessage: {
    ...fonts.body,
    alignSelf: "center",
    marginBottom: 10,
    color: "red",
  },
});

export default styles;
