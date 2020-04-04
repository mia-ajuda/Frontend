import { StyleSheet } from "react-native";

import colors from "../../../assets/styles/colorVariables";

export default StyleSheet.create({
  helpListContainer: {
    backgroundColor: colors.primary,
    width: "100%",

    alignSelf: "flex-end",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  listContent: {
    width: "90%",

    alignSelf: "center",
  },

  buttonStyle: {
    padding: 2,
  },
});
