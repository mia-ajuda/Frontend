import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 40
  },
  logo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#c4c4c4",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  thumbnail: {
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
  },
  text: {
    ...fonts.subtitle,
    fontFamily: "montserrat-semibold",
  },
  textView: {
    flex: 6,
    margin: 16,
    alignItems: "flex-start",
  },
  btnView: {
    flex: 1,
    alignItems: "center",
    marginVertical: 40,
  },
  buttonPreview: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'flex-end'
  },
  btn:{
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: '#4b8ab9',
    borderRadius: 4,
    width: 150,
    alignItems: 'center'
  },
  btnText: {
    fontSize: 20,
    color:'#4b8ab9',
    padding: 10,
    fontFamily: "montserrat-medium"
  },
  btn1:{
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: '#4b8ab9',
    backgroundColor: '#4b8ab9',
    borderRadius: 4,
    width: 150,
    alignItems: 'center'
  },
  btnText1: {
    fontSize: 20,
    color:'#f7f7f7',
    padding: 10,
    fontFamily: "montserrat-medium"
  },
  selectText:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 40
  }
});

export default styles;
