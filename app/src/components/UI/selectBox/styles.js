import { StyleSheet } from "react-native";
import colors from "../../../../assets/styles/colorVariables"


const styles = StyleSheet.create({
  checkBoxText: {
    fontSize: 15,
  },
  container: {
    backgroundColor: colors.light,
    justifyContent: 'flex-start',
    padding: 0,
    borderColor: colors.light,
    marginLeft: 0
  }
});

export default styles;
