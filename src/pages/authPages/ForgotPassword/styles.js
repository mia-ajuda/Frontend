import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  background:{
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
  text:{
    textAlign: 'justify',
    fontSize: 20,
    fontFamily: "montserrat-semibold",
  },
  inputView:{
    flex:2,
    width: '80%',
  }
  ,
  input:{
    height:50,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#4b8ab9',
    marginBottom: 10
  },
  inputText:{
    fontSize: 20,
    fontFamily: "montserrat-semibold",
    color: "#4b8ab9"
  },
  btnView:{
    flex: 1,
    width: '80%',
    justifyContent:'center'

  },
  login: {
    alignItems:'center',
    justifyContent: 'center',
    height:50,
    backgroundColor: '#4b8ab9',
    borderRadius: 5,
  },
  btnText:{
    color: '#f7f7f7',
    fontFamily: "montserrat-semibold"
  }
});

export default styles;