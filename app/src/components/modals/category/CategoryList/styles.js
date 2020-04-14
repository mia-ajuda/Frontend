import { StyleSheet } from "react-native";
import fonts from "../../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  modalContent: {
    width: "80%",
    height: "80%",
    backgroundColor: "#fff",
    alignSelf: "center",
    elevation: 5,
    borderRadius: 15,
    top: "6.5%",
    padding: 16,
  },
  modalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "center",
    top: 15,
  },
  icon: {
    right: 20,
    position: "absolute",
  },
  title: {
    ...fonts.title,
  },
  categoryText: {
    ...fonts.subtitle,
    marginLeft: 10,
  },
  modalBody: {
    marginTop: 25,
    height: "80%",
  },
  filterButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default styles;
