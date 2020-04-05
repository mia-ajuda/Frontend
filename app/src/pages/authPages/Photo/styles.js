import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  button: {
    backgroundColor: "#c4c4c4",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  thumbnail: {
    width: 300,
    height: 300,
    borderRadius: 300 / 2,
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
    alignItems: "flex-start",
    marginVertical: 40,
  },
});

export default styles;
