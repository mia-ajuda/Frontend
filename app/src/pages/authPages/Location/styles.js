import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../assets/styles/colorVariables";
import fonts from "../../../../assets/styles/fontVariable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-around',
  },
  textMapContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'flex-end',
    justifyContent: 'space-around',
  },
  titleBox: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    elevation: 8,
    alignContent: 'center',
    alignSelf: 'center',
    width: "90%",
    marginTop: "20%",
  },
  title: {
    ...fonts.body,
    color: colors.black,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  instructionBox: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    elevation: 8,
    alignSelf: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    width: "90%",
    height: "7%",
    marginTop: "135%"
  },
  instruction: {
    ...fonts.body,
    color: colors.primary,
    textAlign: 'justify',
    fontSize: 18, 
  },
  map: {
    width: "100%",
    height: "100%"
  },
  locationButton: {
    width: "40%",
    height: 50,
    marginTop: -100,
  },
  buttonsBox: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-around',
  }
});

export default styles;
