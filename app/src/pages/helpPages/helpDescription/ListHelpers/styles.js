import { StyleSheet } from 'react-native';
import colors from '../../../../../assets/styles/colorVariables';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonHelpers: {
    width: '100%',
    backgroundColor: colors.primary,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  textBtn: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  listPossibleHelpers: {
    flex: 1,
    width: '100%',
    paddingVertical: 20,
  },
  helper : {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 4,
    marginBottom: 10,
  },
  imageProfile: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 15,
    borderColor: colors.primary,
    borderWidth: 3
  },
  infoText: {
    fontSize: 15
  }
});