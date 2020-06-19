import { StyleSheet } from 'react-native';
import fonts from '../../../assets/styles/fontVariable';
import colors from '../../../assets/styles/colorVariables';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyListImage: {
    resizeMode: 'contain',
    width: 200,
    height: 200,
  },

  emptyListText: {
    ...fonts.title,
    color: colors.primary,
    marginTop: 10,
    textAlign: 'center',
  },
});
export default styles;
