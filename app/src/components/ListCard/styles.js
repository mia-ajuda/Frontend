import { StyleSheet } from "react-native";

export default StyleSheet.create({
  cardContainer: {
    maxWidth: 740,
    maxHeight: 240,

    marginTop: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,

    backgroundColor: "#F7F7F7",
    borderRadius: 8,

    justifyContent: "center",
    alignItems: "flex-start",

    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
    paddingTop: 10
  },

  cardTitle: {
    maxWidth: "100%",
    maxHeight: "30%"
  },

  titleContent: {
    fontWeight: "bold",
    fontSize: 22,

    lineHeight: 30,
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
    fontSize: 10,

    lineHeight: 12,
    color: "#353535"
  },

  categoryWarning: {
    marginTop: 10,
    backgroundColor: "#F7EF6E",
    borderRadius: 8,

    maxWidth: 200,
    maxHeight: 30,

    paddingHorizontal: 15,

    alignSelf: "flex-start",
  },

  categoryName: {
    color: "#353535",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 30,
    textAlign: "center"
  }
});
