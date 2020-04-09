import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginVertical: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    ...fonts.title,
    fontFamily: "montserrat-semibold",
    marginBottom: 40,
  },
  form: {
    flex: 2,
    marginVertical: 10,
  },
  viewMargin: {
    marginVertical: 6,
  },
});

export default styles;
