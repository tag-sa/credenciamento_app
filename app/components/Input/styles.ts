import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: COLORS.grayColor,
    borderRadius: 7,
  },
  label: {
    color: COLORS.blueColor,
  },
  inputText: {
    color: COLORS.grayColor,
    marginTop: 10,
    fontWeight: 'bold',
  },
  
});