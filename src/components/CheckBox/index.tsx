import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native'

interface CheckBoxProps {
  checked: boolean
  borderColor?: string
  size?: number
  setChecked: (checked: boolean) => void
}

export const CheckBox = ({ checked, setChecked, borderColor, size }: CheckBoxProps) => {
  const checkSize = size || 24
  const checkBorderColor = borderColor || 'black'

  return (
    <Pressable
      style={[{ ...styles.checkboxBase, borderColor: checkBorderColor, width: checkSize, height: checkSize }, checked && { ...styles.checkboxChecked }]}
      onPress={() => setChecked(!checked)}
    >
      {checked && <Ionicons name="checkmark" size={checkSize - 4} color={checkBorderColor} />}
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
