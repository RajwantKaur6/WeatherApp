import { StyleSheet } from 'react-native';
import { colors } from '../../values/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: colors.backgroundColor,
  },
  topContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: colors.white,
    height: 40,
    width: 40,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  result: {
    padding: 10,
    backgroundColor: colors.slightWhite,
    marginVertical: 2,
    borderRadius: 6,
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});
