import { StyleSheet } from 'react-native';
import fonts from '../../../../assets/styles/fontVariable';
import colors from '../../../../assets/styles/colorVariables';
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.light,
  },
  form: {
    width: '100%',
    justifyContent: 'space-between',
  },
  text1: {
    ...fonts.title,
    fontFamily: 'montserrat-semibold',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  btnView: {
    width: '100%',
  },
  viewMargin: {
    marginVertical: 6,
  },
  scroll: {
    width: '100%',
  },
  scroll2: {
    width: '100%',
    marginTop: 50,
  },
  inputMask: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    fontFamily: 'montserrat-regular',
  },
  valid: {
    borderColor: colors.primary,
  },
  invalid: {
    borderColor: colors.danger,
  },
  label: {
    fontFamily: 'montserrat-semibold',
    color: colors.primary,
  },
  backIcon: {
    alignItems: 'flex-start',
    marginTop: 15,
  },
  errorMessage: {
    ...fonts.body,
    alignSelf: 'center',
    marginBottom: 20,
    color: 'red',
  },
});

export default styles;
