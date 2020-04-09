import { StyleSheet } from "react-native";
import colors from "../../../assets/styles/colorVariables";
import fonts from "../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: "15%",
    backgroundColor: colors.primary
  },
  titleContent: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center"
  },
  titleContext: {
    ...fonts.title,
    color: colors.light,
    fontSize: 28,
    fontFamily: "montserrat-semibold",
  },
  iconContent: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center"  
  }
});
  
  export default styles;
  