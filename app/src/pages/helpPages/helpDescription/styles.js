import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  userInfo: {
    flex: 1,
    flexDirection: "row"
  },
  profileImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 50,
    marginHorizontal: 10,
    alignSelf: "center"
  },
  infoTextView: {
    alignSelf: "center"
  },
  infoText: {
    ...fonts.body,
    textAlign: "justify"
  },
  helpInfo: {
    flex: 3,
    justifyContent: "space-between",
    padding: 20
  },
  helpButtons: {
    flex: 1
  },
});

export default styles;
