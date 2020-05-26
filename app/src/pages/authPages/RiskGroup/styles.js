import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";
import colors from "../../../../assets/styles/colorVariables";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.light,
  },
  viewText: {
    width: "90%",
    justifyContent: "center",
  },
  text1: {
    ...fonts.title,
    fontFamily: "montserrat-semibold",
    marginVertical: 10,
  },
  input: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inputItem: {
    marginHorizontal: 6,
  },
  btnView: {
    width: "90%",
    bottom: 20,
    justifyContent: "flex-end",
    position: "absolute",
  },
  backIcon: {
    alignSelf: "flex-start",
    marginTop: 40,
    marginLeft: 15,
  },
});

export default styles;
