import { StyleSheet, Dimensions } from "react-native";
// import colors from "../../../../../assets/styles/colorVariables";
// import fonts from "../../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    maxHeight:Dimensions.get('window').height / 2,
    justifyContent:'center',
    textAlign:'center',
    borderRadius: 20,
  }
});

export default styles;
