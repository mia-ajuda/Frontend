// import { StyleSheet } from "react-native";
// import fonts from "../../../../assets/styles/fontVariable"

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: Constants.statusBarHeight,
//   },
//   scrollView: {
//     backgroundColor: 'pink',
//     marginHorizontal: 10 ,
//   },
//   viewText:{
//     flex: 2,
//     width: '80%',
//     justifyContent:'center',
//     resizeMode: "contain"
//   },
//   text1: {
//     ...fonts.title,
//     fontFamily: "montserrat-semibold"
//   },
//   inputView:{
//     flex:2,
//     width: '80%',
//     resizeMode: "contain"
//   },
//   btnView:{
//     flex: 1,
//     width: '80%',
//     justifyContent:'center',
//     resizeMode: "contain"
//   },

// });

// export default styles;

import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";
const styles = StyleSheet.create({
  safeAreaView:{
    flex:1,
    marginVertical:40,
    marginHorizontal:40,
    justifyContent: 'center',
    alignItems:'center'
  },
  text1: {
    ...fonts.title,
    fontFamily: "montserrat-semibold",
  },
  form: {
    flex: 2,
    marginVertical: 20
  },
});

export default styles;
