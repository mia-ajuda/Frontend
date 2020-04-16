import { StyleSheet } from "react-native";
import colors from "../../../../assets/styles/colorVariables";
import fonts from "../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  logo: {
    marginTop: 40,
    flex: 1.5,
    justifyContent: "center",
  },
  container: {
    flex: 1.5,
    justifyContent: "center",
    width: "90%",
    marginVertical: 20,
  },
  input: {
    ...fonts.body,
    borderBottomWidth: 2,
    borderBottomColor: colors.light,
    marginBottom: 30,
    color: colors.light,
  },
  text: {
    color: colors.primary,
    padding: 10,
    ...fonts.body,
  },
  signUP: {
    alignItems: "center",
    padding: 20,
  },
  signupText: {
    ...fonts.body,
    color: colors.light,
    fontFamily: "montserrat-semibold",
  },
  forgotPassword: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  forgotPasswordtext: {
    color: colors.light,
  },
  viewLogin: {
    flex: 1,
    width: "90%",
  },
});

export default styles;
