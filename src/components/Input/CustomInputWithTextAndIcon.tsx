import Ionicons from '@expo/vector-icons/Ionicons'
import { useState } from 'react'
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from 'react-native'

import { MaskedTextInput } from 'react-native-mask-text'
import { COLORS } from '../../constants/Colors'
import { FormatType } from 'react-native-mask-text/lib/typescript/src/@types/FormatType'

interface InputProps {
  label?: string
  value?: string
  placeholder?: string
  onChangeText: (text: string, rawText?: string) => void
  onInputPress?: (clicked: boolean) => void
  marginTop?: number
  marginBottom?: number
  icons?: Array<any>
  iconColor?: string
  iconSize?: number
  obscureText?: boolean
  multiline?: boolean
  numberOfLines?: number
  keyboardType?: KeyboardTypeOptions
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  error?: boolean
  textWeight?: 'normal' | 'bold'
  mask?: string
  type?: FormatType
  erroMessage?: string
  addrRef?: any
  flexGrow?: number
}

export default function CustomInputWithTextAndIcon(props: InputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  return (
    <>
      <View
        style={{
          ...styles.input,
          ...(props.flexGrow && { flexGrow: props.flexGrow }),
          marginTop: props.marginTop,
          marginBottom: props.marginBottom,
          borderColor: props.error ? COLORS.red : COLORS.lightGray,
          ...(!props.error && isFocused && styles.inputFocused)
        }}
      >
        {props.label && (
          <Text
            style={
              (isFocused ? styles.labelFocused : styles.label,
              {
                fontWeight: props.textWeight || 'bold',
                color: isFocused ? COLORS.darkBlue : COLORS.darkGray
              })
            }
          >
            {props.label}
          </Text>
        )}

        <View>
          {(props.mask || props.type) && (
            <MaskedTextInput
              ref={props.addrRef}
              autoCapitalize={props.autoCapitalize}
              onFocus={() => {
                setIsFocused(true)
                props.onInputPress && props.onInputPress(true)
              }}
              onBlur={() => {
                setIsFocused(false)
              }}
              type={props.type}
              options={
                props.type && props.type == 'currency'
                  ? {
                      prefix: 'R$ ',
                      decimalSeparator: ',',
                      groupSeparator: '.',
                      precision: 2
                    }
                  : {}
              }
              style={{
                ...styles.inputText,
                color: isFocused ? COLORS.darkBlue : COLORS.darkGray,
                fontWeight: props.textWeight || 'normal',
                marginTop: props.label ? 10 : 0
              }}
              mask={props.mask}
              onChangeText={(text, rawText) => {
                props.onChangeText(text, rawText)
              }}
              value={props.value}
              placeholder={props.placeholder}
              secureTextEntry={props.obscureText && !showPassword}
              keyboardType={props.keyboardType}
            />
          )}

          {!props.mask && !props.type && (
            <TextInput
              ref={props.addrRef}
              autoCapitalize={props.autoCapitalize}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false)
              }}
              style={{
                ...styles.inputText,
                color: isFocused ? COLORS.darkBlue : COLORS.darkGray,
                fontWeight: props.textWeight || 'normal',
                height: props.multiline ? props.numberOfLines : null,
                marginTop: props.label ? 10 : 0
              }}
              multiline={props.multiline}
              numberOfLines={props.multiline ? props.numberOfLines : null}
              onChangeText={(text) => {
                props.onChangeText(text, text)
              }}
              value={props.value}
              placeholder={props.placeholder}
              secureTextEntry={props.obscureText && !showPassword}
              keyboardType={props.keyboardType}
            />
          )}

          {props.icons && (
            <Ionicons
              name={!showPassword ? props.icons[0] : props.icons[1]}
              onPress={() => setShowPassword(!showPassword)}
              size={props.iconSize}
              style={{ position: 'absolute', right: 10 }}
              color={props.iconColor}
            />
          )}
        </View>
      </View>
      {props.error && <Text style={styles.invalid}>{props.erroMessage}</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    // flexGrow: 1,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: COLORS.darkGray,
    borderRadius: 7
  },
  inputFocused: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: COLORS.lightBlue,
    borderRadius: 7,
    backgroundColor: COLORS.translucentBlue
  },
  label: {
    color: COLORS.lightGray,
    fontWeight: '500'
  },
  labelFocused: {
    fontSize: 120,
    height: 400,
    color: COLORS.darkBlue,
    fontWeight: 'bold'
  },
  inputText: {
    color: COLORS.darkGray,

    fontWeight: 'bold'
  },
  invalid: {
    marginTop: 3,
    marginLeft: 2,
    color: COLORS.red,
    fontSize: 10
  }
})
