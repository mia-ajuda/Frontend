import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../assets/styles/colorVariables";
import fonts from "../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },

  content: {
    width: "80%",
    backgroundColor: colors.light,
    alignSelf: "center",
    marginTop: Dimensions.get("window").height / 3,
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
  },

  title: {
    ...fonts.title,
    color: colors.danger,
    fontSize: 26,
    marginBottom: 5,
  },

  warningText: {
    ...fonts.body,
    marginBottom: 12,
    fontSize: 18,
    textAlign: "center",
  },

  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default styles;
