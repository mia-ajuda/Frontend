import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4b8ab9",
  },
  logo: {
    flex: 2,
    justifyContent: "center",
  },
  container: {
    flex: 2,
    justifyContent: "center",
    width: "90%",
    marginVertical: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#f7f7f7",
    marginBottom: 30,
    fontFamily: "montserrat-semibold",
    color: "#FFF",
    fontSize: 14
  },
  login: {
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 5,
  },
  text: {
    color: "#4b8ab9",
    fontSize: 16,
    padding: 10,
    fontFamily: "montserrat-semibold",
  },
  signUP: {
    alignItems: "center",
    padding: 20,
  },
  signupText: {
    color: "#f7f7f7",
    fontSize: 16,
    fontFamily: "montserrat-semibold",
  },
  forgotPassword: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  forgotPasswordtext: {
    color: "#f7f7f7",
  },
  viewLogin: {
    flex: 1,
    width: "80%",
  },
});

export default styles;
