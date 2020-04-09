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
    flex: 1,
    width: '80%',
    justifyContent: 'center',
    marginTop: 45
  },
  text1: {
    ...fonts.title,
    fontFamily: "montserrat-semibold"
  },
  inputView:{
    flex:2,
    width: '80%',
    marginVertical: 10
  },
  btnView:{
    width: '80%',
    justifyContent:'center',
    marginBottom: 45
  },
  inputMask: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#4b8ab9",
    padding: 10,
    fontSize: 16,
    fontFamily: "montserrat-regular"   
  },
  label: {
    fontFamily: "montserrat-semibold",
    color: "#4b8ab9"
  }
});

export default styles;