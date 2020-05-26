import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../../assets/styles/colorVariables";
import fonts from "../../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    marginTop: Dimensions.get("window").height / 4,
    backgroundColor: "#fff",
    maxHeight: Dimensions.get("window").height / 4,
    borderRadius: 20,
    justifyContent: "space-around",
    marginHorizontal: 15,
  },
  modalText: {
    marginTop: 25,
    ...fonts.body,
    color: colors.black,
    fontSize: 20,
    textAlign: "center",
  },
  modalButton: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  loading: {
    backgroundColor: "#000",
  },
});

export default styles;
