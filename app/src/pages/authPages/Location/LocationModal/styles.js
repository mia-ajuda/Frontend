import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../../assets/styles/colorVariables";
import fonts from "../../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  modal: {
    marginTop: Dimensions.get("window").height / 4,
    backgroundColor: "white",
    maxHeight: Dimensions.get("window").height / 4,
    borderRadius: 20,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "space-around",
    padding: 10,
  },
  modalContent: {
    flex: 1,
  },
  modalText: {
    marginTop: 25,
    ...fonts.body,
    color: colors.black,
    fontSize: 20,
    textAlign: "center",
  },
  modalButtonBox: {
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    paddingBottom: 10,
  },
  modalButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  loading: {
    backgroundColor: "#000",
  },
});

export default styles;
