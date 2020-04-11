import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";
import colors from "../../../../assets/styles/colorVariables";

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.light,
  },
  viewText: {
    width: "90%",
    justifyContent: "center",
  },
  text1: {
    ...fonts.title,
    fontFamily: "montserrat-semibold",
    marginVertical: 50,
  },
  input: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 0,
  },
  inputItem: {
    marginHorizontal: 6
  },
  btnView: {
    width: "90%",
    marginBottom: 20,
    justifyContent: "flex-end",
    
  },
});

export default styles;
