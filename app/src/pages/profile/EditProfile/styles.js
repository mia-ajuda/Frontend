import { StyleSheet } from "react-native";
import colors from '../../../../assets/styles/colorVariables';
import fonts from '../../../../assets/styles/fontVariable';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  content: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  btnEdit: {
    backgroundColor: "blue",
    width: "100%"
  },
  inputMask: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    fontFamily: "montserrat-regular",
    width: '100%'
  },
  valid: {
    borderColor: colors.primary
  },
  invalid: {
    borderColor: colors.danger
  },
  label: {
    ...fonts.body,
    fontFamily: "montserrat-semibold",
    color: colors.primary,
  },
  phoneView: {
    width: '100%'
  }
});
