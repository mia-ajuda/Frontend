import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  background:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4b8ab9'
  },
  logo: {
    flex:1,
    justifyContent:'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
    marginTop: 50
    
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#f7f7f7',
    marginBottom: 30,
    fontFamily: "montserrat-semibold",
  },
  login: {
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 5,
  },
  text: {
    color: '#4b8ab9',
    fontSize: 16,
    padding: 10,
    fontFamily: "montserrat-semibold",
  },
  signUP:{
    alignItems: 'center',
    padding: 20
  },
  signupText:{
    color: '#f7f7f7',
    fontSize: 16,
    fontFamily: "montserrat-semibold",
  }
});

export default styles;