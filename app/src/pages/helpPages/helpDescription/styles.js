import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  userInfo:{
    flex: 1,
    flexDirection:"row",
  },
  profileImage:{
    width: 100,
    height:100,
    resizeMode:"cover",
    borderRadius:50,
    marginHorizontal: 10,
    alignSelf: 'center'
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
  },
  helpButtons: {
    flex: 1,
  },
  volunteerContainer: {
    flexDirection: "column",
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 4,
  },
  volunteerImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 15
  },
  textVolunteer: {
    ...fonts.subtitle,
    marginBottom: 10,
    fontWeight: 'bold'
  },
});

export default styles;
