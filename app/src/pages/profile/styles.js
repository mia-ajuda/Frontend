import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20
  },
  imageView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  imageProper: { 
    width: 175, 
    height: 175, 
    borderRadius: 100 
  },
  viewContent: {
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
    marginBottom: 10
  }
});

export default styles;
