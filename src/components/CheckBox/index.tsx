import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native'

interface CheckBoxProps {
  checked: boolean
  borderColor?: string
  size?: number
  backgroundColor?: string
  checkBorderColor?: string
  setChecked: (checked: boolean) => void
}

export const CheckBox = ({ checked, setChecked, borderColor, size, backgroundColor, checkBorderColor = borderColor }: CheckBoxProps) => {
  const checkSize = size || 24
  // const checkBorderColor = borderColor || 'black'

  return (
    <Pressable
      style={[
        { ...styles.checkboxBase, borderColor: checkBorderColor, width: checkSize, height: checkSize, backgroundColor: backgroundColor || 'transparent' },
        checked && { ...styles.checkboxChecked }
      ]}
      onPress={() => setChecked(!checked)}
    >
      {checked && <Ionicons name="checkmark" size={checkSize - 4} color={checkBorderColor} style={{ fontWeight: 'bold' }} />}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'transparent'
  },
  checkboxChecked: {}
})
