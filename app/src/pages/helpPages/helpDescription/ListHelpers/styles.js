import { StyleSheet } from 'react-native';
import colors from '../../../../../assets/styles/colorVariables';

export default StyleSheet.create({
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
  }
});