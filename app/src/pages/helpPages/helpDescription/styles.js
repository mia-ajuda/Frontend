import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FA0',
    padding: 20
  },
  userInfo:{
    flex: 1,
    flexDirection:"row",
    backgroundColor: "#F0F"
  },
  profileImage:{
    width: 100,
    height:100,
    resizeMode:"cover",
    borderRadius:50,
    
  },
  infoTextView:{
    alignSelf:"center",
  },
  infoText:{
    ...fonts.body, 
    textAlign: 'justify'
  },
  helpInfo:{
    flex: 3,
    justifyContent:"space-between",
    padding: 20,
    backgroundColor: '#FF0',
  },
  helpButtons: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#0FF'
  }
});

export default styles;
