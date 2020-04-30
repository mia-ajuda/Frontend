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
    padding: 20
  }
});