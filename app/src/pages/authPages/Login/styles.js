import { StyleSheet } from "react-native";
import colors from "../../../../assets/styles/colorVariables";
import fonts from "../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  logo: {
    marginTop: 10,
    flex: 1.5,
    justifyContent: "center",
    marginBottom: 50
  },
  input: {
    ...fonts.body,
    borderBottomWidth: 2,
    borderBottomColor: colors.light,
    marginBottom: 20,
    color: colors.light,
    width: '90%'
  },
  text: {
    color: colors.primary,
    padding: 10,
    ...fonts.body,
  },
  signUP: {
    alignItems: "center",
    marginBottom: 5,  
  },
  signupText: {
    ...fonts.body,
    color: colors.light,
    fontFamily: "montserrat-semibold",
    marginBottom: 30
  },
  viewForgotPassword:{
    alignItems: 'flex-end'
  },
  forgotPasswordtext: {
    color: colors.light,
  },
  login: {
    width: '90%'
    
  },
  viewLgnFacebook:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    
  },

  btnFacebook:{
    borderRadius: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginVertical: 5,
    padding: 15,
    width: '100%',
    backgroundColor:"#3B5998",

  },

  lgnFacebook:{
    color: 'white',
    fontFamily: "montserrat-semibold",
    fontSize: 18,
    
    marginLeft: 20
  },
  viewLgnGoogle:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    
  },

  btnGoogle:{
    borderRadius: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginVertical: 5,
    padding: 15,
    width: '100%',
    backgroundColor:"#d93025",

  },

  lgnGoogle:{
    color: 'white',
    fontFamily: "montserrat-semibold",
    fontSize: 18,
    
    marginLeft: 20
  },
  viewLgn:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
    width: "100%",
  }
});

export default styles;
