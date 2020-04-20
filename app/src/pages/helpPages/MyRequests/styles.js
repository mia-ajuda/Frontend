import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import colors from "../../../../assets/styles/colorVariables";
import fonts from "../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },

  helpList: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },

  tabContainer: {
    backgroundColor: colors.primary,
  },

  tabLabel: {
    color: colors.light,
  },

  tabIndicator: {
    backgroundColor: colors.light,
    padding: 2,
  },

  emptyListImage: {
    resizeMode: "contain",
    width: 200,
    height: 200,
  },

  emptyListText: {
    ...fonts.title,
    color: colors.primary,
    marginTop: 10,
    textAlign: "center",
  },
});

export default styles;
