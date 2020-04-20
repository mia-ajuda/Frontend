import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:20,
  },
  userInfo:{
    flexDirection:"row",
    
  },
  profileImage:{
    width: 100,
    height:100,
    resizeMode:"cover",
    borderRadius:50,
    
  },
  infoTextView:{
    alignSelf:"center",
    marginLeft:40,
    paddingRight: 70
  },
  infoText:{
    ...fonts.body, 
  },
  
  helpInfo:{
    flex:1,
    marginTop:50,
    justifyContent:"space-between"
  },
  categoryText: {
    marginBottom: 20,
  },
  descriptionText: {
    
  },
  
  
});

export default styles;
