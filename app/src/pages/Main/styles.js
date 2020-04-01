import { StyleSheet } from "react-native";
import fonts from "../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  text1: {
    ...fonts.h1
  },
  text2: {
    ...fonts.h2
  },
  text3: {
    ...fonts.p
  }
});

export default styles;
