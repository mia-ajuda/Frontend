import { StyleSheet } from "react-native";

import colors from "../../../assets/styles/colorVariables";
import fonts from "../../../assets/styles/fontVariable";

export default StyleSheet.create({
  cardContainer: {
    maxWidth: 740,
    maxHeight: 240,

    marginTop: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,

    backgroundColor: colors.light,
    borderRadius: 8,

    flexDirection: "row",

    paddingVertical: 20,

    width: "100%",
  },

  notificationImage: {
    resizeMode: "contain",
    height: 60,
    width: 60,
    marginLeft: 20,
  },

  info: {
    marginLeft: 15,
  },

  title: {
    fontWeight: "bold",
    fontSize: 16,
  },

  description: {},

  time: {
    color: "rgba(0, 0, 0, 0.6)",
    fontWeight: "400",
  },
});
