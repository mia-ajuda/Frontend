import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";
import colors from "../../../../assets/styles/colorVariables";

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: colors.light,
  },
  text1: {
    ...fonts.title,
    fontFamily: "montserrat-semibold",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  btnView: {
    width: "100%",
  },
  viewMargin: {
    marginVertical: 6,
  },
  backIcon: {
    alignItems: "flex-start",
    marginTop: 15,
  },
});

export default styles;
