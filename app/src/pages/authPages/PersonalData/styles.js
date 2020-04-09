import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7'
  },
  viewText:{
    flex: 2,
    width: '80%',
    justifyContent: 'center',
  },
  text1: {
    ...fonts.title,
    fontFamily: "montserrat-semibold"
  },
  inputView:{
    flex:2,
    width: '80%',
  },
  btnView:{
    flex: 1,
    width: '80%',
    justifyContent:'center'
  },

});

export default styles;