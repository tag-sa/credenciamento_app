import { StyleSheet } from 'react-native'
import { COLORS } from '../../constants/Colors'

export const menuItemStyle = StyleSheet.create({
  label: {
    color: COLORS.lightBlue,
    marginTop: 5,
    fontWeight: '600'
  },
  activeLabel: {
    color: COLORS.darkBlue,
    fontWeight: '900'
  }
})
