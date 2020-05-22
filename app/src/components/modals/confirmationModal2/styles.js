import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../assets/styles/colorVariables";
import fonts from "../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  content: {
    paddingTop: 30,
    paddingBottom: 20,
    padding: 20,
    width: "80%",
    backgroundColor: "#fff",
    alignSelf: "center",
    marginTop: Dimensions.get("window").height / 3.5,
    borderRadius: 15,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  title: {
    ...fonts.body,
    alignSelf: "center",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default styles;
