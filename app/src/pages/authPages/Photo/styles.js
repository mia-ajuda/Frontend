import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";
import colors from "../../../../assets/styles/colorVariables";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    backgroundColor: colors.light
  },
  logo: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#c4c4c4",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  thumbnail: {
    width: 200,
    height: 200,
    borderRadius: 125,
    marginTop: 20
  },
  text: {
    ...fonts.subtitle,
    fontFamily: "montserrat-semibold",
    textAlign: "center",
  },
  smallText: {
    ...fonts.subtitle,
    fontSize: 12,
    fontFamily: "montserrat-semibold",
    textAlign:"center",
    marginTop: 5,
    marginBottom: 5,
  },
  hyperLink: {
    ...fonts.subtitle,
    fontSize: 13,
    fontFamily: "montserrat-semibold",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 5,
    color: colors.primary,
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
    width:"100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    alignContent:"space-between",
    justifyContent:"space-evenly",
    marginTop: 30
  },
  btn: {
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 4,
    width: 150,
    alignItems: "center",
  },
  btnText: {
    fontSize: 20,
    color: colors.primary,
    padding: 10,
    fontFamily: "montserrat-medium",
  },
  btn1: {
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    borderRadius: 4,
    width: 150,
    alignItems: "center",
  },
  btnText1: {
    fontSize: 20,
    color: colors.light,
    padding: 10,
    fontFamily: "montserrat-medium",
  },
  selectText: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 40,
    width: "75%",
  },
  backIcon:{
    alignItems: 'flex-start',
    marginTop:5
  },
  checkboxView:{
    width:"100%",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    padding:10,
  },
});

export default styles;
