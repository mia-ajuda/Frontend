import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7f7f7"
  },
  viewText: {
    flex: 7,
    marginVertical: 40,
    width: "80%",
    justifyContent: "center"
  },
  text1: {
    ...fonts.title,
    fontFamily: "montserrat-semibold"
  },
  input: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  inputItem:{
    flexGrow: 0,
    padding: 2
  },

  btnView: {
    flex: 3,
    width: "80%",
    justifyContent: "center"
  }
});

export default styles;
