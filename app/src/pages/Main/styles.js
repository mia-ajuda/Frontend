import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  text: {
    fontFamily: "montserrat-semibold",
    fontSize: 20,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  catAvatar: {
    height: 54,
    width: 54,
    resizeMode: "contain",
  },
});

export default styles;
