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
  text: {
    fontFamily: "montserrat-semibold",
    fontSize: 20
  },
  map: {
    width: "100%",
    height: "100%"
  }
});

export default styles;
