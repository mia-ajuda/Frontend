import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  userInfo: {
    flexDirection: "row",
  },
  profileImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 50,
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
  },
  categoryText: {
    marginBottom: 20,
  },

  ViewLink: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default styles;
