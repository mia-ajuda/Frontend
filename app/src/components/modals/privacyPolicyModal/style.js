import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";
const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    zIndex: 5,
    right: 15,
    top: 15,
  },
  privacyLink: {
    marginVertical: 20,
    width: 240,
  },
  privacyText: {
    ...fonts.subtitle,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#000",
    fontSize: 16,
  },
});
export default styles;
