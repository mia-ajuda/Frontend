import { StyleSheet } from "react-native";
import colors from "../../../../assets/styles/colorVariables";
import fonts from "../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  logo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    justifyContent: "center",
    marginBottom: 50,
  },
  input: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textInput: {
    ...fonts.body,
    borderBottomWidth: 2,
    borderBottomColor: colors.light,
    color: colors.light,
    marginVertical: 20,
    width: "90%",
  },
  forgotPassword: {
    width: "90%",
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  forgotPasswordtext: {
    color: colors.light,
  },
  viewBtn: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  login: {
    width: "90%",
  },
  signupText: {
    ...fonts.body,
    color: colors.light,
    fontFamily: "montserrat-semibold",
    marginBottom: 30,
  },
  viewGoogle: {
    backgroundColor: "#d93025",
    width: "25%",
    borderRadius: 25,
    marginHorizontal: 5
  },
  btnGoogle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  lgnGoogle: {
    color: "white",
    fontFamily: "montserrat-semibold",
    fontSize: 18,
  },
  viewFacebook: {
    backgroundColor: "#3B5998",
    width: "25%",
    borderRadius: 25,
    marginHorizontal: 5
  },
  btnFacebook: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  lgnFacebook: {
    color: "white",
    fontFamily: "montserrat-semibold",
    fontSize: 18,
  },
  quickLogin: {
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 30,
    width: "90%",
  },
});

export default styles;
