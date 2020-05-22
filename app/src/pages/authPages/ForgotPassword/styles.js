import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: 20
  },
  backIcon: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start"
  },
  content: {
    flex: 8,
    justifyContent: "space-between"
  },
  contentText: {
    marginTop: 70,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  inputWrapper: { 
    width: "100%",
    marginTop: 30
  },
  textTitle: {
    ...fonts.title,
    fontWeight: "bold"
  },
  subtitle: {
    ...fonts.subtitle,
    textAlign: "justify",
    marginTop: 10
  }
});
