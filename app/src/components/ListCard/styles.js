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

    justifyContent: "center",
    alignItems: "flex-start",

    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
    paddingTop: 10,
  },

  cardTitle: {
    maxWidth: "100%",
    maxHeight: "30%",
  },

  titleContent: {
    ...fonts.title,
    fontFamily: "montserrat-semibold",
    color: colors.primary,

    lineHeight: 30,
    textAlign: "center",
  },

  cardDescription: {
    marginTop: 5,
    maxWidth: "100%",
    maxHeight: "70%",

    alignItems: "flex-start",
    justifyContent: "center",
  },

  descriptionContent: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 12,

    lineHeight: 14,
    color: colors.dark,
  },

  categoryWarning: {
    backgroundColor: colors.secondary,
    borderRadius: 8,

    maxHeight: 30,

    paddingHorizontal: 15,

    alignSelf: "flex-start",
  },

  categoryName: {
    ...fonts.body,
    fontFamily: "montserrat-semibold",
    lineHeight: 30,
    textAlign: "center",
  },

  bottomItens: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelBadge: {
    color: "#FFF",
    fontWeight: "bold",
  },
  badgeStyle: {
    backgroundColor: colors.danger,
    height: 30,
    width: 30,
    borderRadius: 50,
  },
  containerBadge: {
    position: "absolute",
    top: -7,
    right: -6,
  },
});
