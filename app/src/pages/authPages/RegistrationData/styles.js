import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";
import color from '../../../../assets/styles/colorVariables';
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginVertical: 50,
    marginHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  form: {
    width: '100%',
    justifyContent: 'space-between'
  },
  text1: {
    ...fonts.title,
    fontFamily: "montserrat-semibold",
    flexDirection: 'column',
    justifyContent: "space-between",
    alignItems: "center",  
  },
  btnView: {
    width: '100%',
  },
  viewMargin: {
    marginVertical: 6,
  },
  scroll: {
    width: '100%',
  },
  inputMask: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    fontFamily: "montserrat-regular",
  },
  valid: {
    borderColor: color.primary,
  },
  invalid: {
    borderColor: color.danger,
  },
  label: {
    fontFamily: "montserrat-semibold",
    color: color.primary,
  },
});

export default styles;
