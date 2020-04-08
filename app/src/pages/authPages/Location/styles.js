import { StyleSheet } from "react-native";
import colors from "../../../../assets/styles/colorVariables";
import fonts from "../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    opacity: 0.75,
    marginTop: -170,
    marginHorizontal: 40,
    padding: 25,
    shadowColor: '#000',
    elevation: 5,
  },
  title: {
    ...fonts.body,
    color: colors.primary
  },
  button: {
    ...fonts.title,
    color: colors.dark
  },
  map: {
    width: "100%",
    height: "100%"
  },
  locationButton: {
    marginTop: -200,
    width: "40%",
    height: 50,
  },
  buttonsBox: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-around',
    marginTop: 120
  },
});

export default styles;
