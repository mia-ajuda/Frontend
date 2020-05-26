import { StyleSheet } from "react-native";
import fonts from "../../../../assets/styles/fontVariable";
import colors from "../../../../assets/styles/colorVariables";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  margiView: {
    marginVertical: 12,
  },
  btnContainer: {
    height: "25%",
  },
  input: {
    ...fonts.body,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.primary,
    padding: 10,
  },
  picker: {
    ...fonts.body,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.primary,
  },
  pikerItem: {
    ...fonts.body,
    color: colors.primary,
  },
  label: {
    ...fonts.body,
    fontFamily: "montserrat-semibold",
    color: colors.primary,
  },
  modal: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: colors.light,
    padding: 20,
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    ...fonts.subtitle,
    fontSize: 20,
    textAlign: "center",
    marginVertical: 30
  },
  loading: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    backgroundColor: "#35353590",
  },
});

export default styles;
