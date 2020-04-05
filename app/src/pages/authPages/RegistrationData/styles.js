import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginVertical: 40,
    marginHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    ...fonts.title,
    fontFamily: "montserrat-semibold",
  },
  form: {
    flex: 2,
    marginVertical: 20,
  },
});

export default styles;
