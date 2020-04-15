import { StyleSheet } from "react-native";

import colors from "../../../assets/styles/colorVariables";

export default StyleSheet.create({
  helpListContainer: {
    backgroundColor: colors.primary,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  listContent: {
    width: "90%",
    alignSelf: "center",
  },

  buttonStyle: {
    padding: 2,
  },
});
