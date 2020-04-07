import { StyleSheet } from "react-native";
import colors from "../../../../assets/styles/colorVariables";
import fonts from "../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
    backgroundColor: '#e74c3c',
    marginTop: -100,
    width: 100,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 8,
  }
});

export default styles;
