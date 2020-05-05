import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    padding: 10
  },
  userInfo: {
    flex: 1,
    flexDirection: "row"
=======
    margin: 20,
  },
  userInfo: {
    flexDirection: "row",
>>>>>>> develop
  },
  profileImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 50,
<<<<<<< HEAD
    marginHorizontal: 10,
    alignSelf: "center"
  },
  infoTextView: {
    alignSelf: "center"
  },
  infoText: {
    ...fonts.body,
    textAlign: "justify"
=======
  },
  infoTextView: {
    alignSelf: "center",
    marginLeft: 40,
    paddingRight: 100,
  },
  infoText: {
    ...fonts.body,
    marginBottom: 3,
  },

  helpInfo: {
    flex: 1,
    marginTop: 50,
    justifyContent: "space-between",
>>>>>>> develop
  },
  helpInfo: {
    flex: 3,
    justifyContent: "space-between",
    padding: 20
  },
<<<<<<< HEAD
  helpButtons: {
    flex: 1
=======

  ViewLink: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
>>>>>>> develop
  },
});

export default styles;
