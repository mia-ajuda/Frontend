import { StyleSheet } from 'react-native';
import fonts from '../../../../assets/styles/fontVariable';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
  },
  backIcon: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
  },
  content: {
    flex: 8,
    justifyContent: 'space-between',
  },
  contentText: {
    marginTop: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    marginTop: 30,
  },
  textTitle: {
    ...fonts.title,
    fontWeight: 'bold',
  },
  subtitle: {
    ...fonts.body,
    textAlign: 'justify',
    marginTop: 10,
  },
  loading: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
