import { StyleSheet } from "react-native";
import colors from '../../../assets/styles/colorVariables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  imageView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  imageProper: { 
    width: 175, 
    height: 175, 
    borderRadius: 100 ,
    marginTop: 30
  },
  viewContent: {
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
    marginBottom: 10,
    paddingVertical: 15
  },
  viewInput: {
    width: '100%',
    margin: 10,
    justifyContent: 'flex-start'
  },
  labelInput: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 18
  },
  inputWrapper: {
    borderWidth: 3,
    borderColor: colors.primary,
    marginTop: 10,
    padding: 15,
    borderRadius: 10
  }
});

export default styles;
