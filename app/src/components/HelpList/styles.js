import { StyleSheet } from "react-native";

import colors from "../../../assets/styles/colorVariables";
import fonts from "../../../assets/styles/fontVariable";

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
  scrollStyle: {
    paddingBottom: 15,
  },
  emptyListText: {
    ...fonts.title,
    color: colors.light,
    marginTop: 10,
  },
  emptyListImage: {
    resizeMode: "contain",
    width: 100,
    height: 100,
  },
  emptyList: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    marginTop: 60,
  },
});
