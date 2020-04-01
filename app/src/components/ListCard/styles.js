import { StyleSheet } from "react-native";

export default StyleSheet.create({
  cardContainer: {
    width: "90%",
    height: "25%",
    maxWidth: 740,
    maxHeight: 240,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,

    backgroundColor: "#F7F7F7",
    borderRadius: 10,

    justifyContent: "center",
    alignItems: "flex-start",

    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15
  },

  cardTitle: {
    maxWidth: "100%",
    maxHeight: "30%"
  },

  titleContent: {
    fontWeight: "bold",
    fontSize: 26,

    lineHeight: 36,
    textAlign: "center",
    color: "#4B8AB9"
  },

  cardDescription: {
    marginTop: 5,
    maxWidth: "100%",
    maxHeight: "70%",

    alignItems: "flex-end",
    justifyContent: "flex-end"
  },

  descriptionContent: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 12,

    lineHeight: 18,
    color: "#353535"
  },

  categoryWarning: {
    marginTop: 5,
    backgroundColor: "#F7EF6E",
    borderRadius: 8,

    maxWidth: 200,
    maxHeight: 50,

    paddingHorizontal: 25,

    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center"
  },

  categoryName: {
    color: "#353535",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 30,
    textAlign: "center"
  }
});
