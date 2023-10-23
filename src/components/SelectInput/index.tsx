import { Pressable, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../constants/Colors'

interface InputProps {
  label: string
  value?: string
  placeholder?: string
  onInputPress?: (_) => void
  marginTop?: number
  marginBottom?: number
  error?: boolean
  textColor?: string
  textWeight?: 'normal' | 'bold'
  erroMessage?: string
  addrRef?: any
}

export default function CustomSelectInput(props: InputProps) {
  return (
    <>
      <Pressable onPress={props.onInputPress}>
        <View
          style={{
            ...styles.input,
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
            borderColor: props.error ? COLORS.red : COLORS.lightGray
          }}
        >
          <Text
            style={{
              ...styles.label,
              fontWeight: props.textWeight || 'bold',
              color: props.textColor || COLORS.darkGray
            }}
          >
            {props.label}
          </Text>
          <View style={styles.inputView}>
            <Text style={styles.inputText}>{!props.value ? props.placeholder : props.value}</Text>
          </View>
        </View>
      </Pressable>
      {props.error && <Text style={styles.invalid}>{props.erroMessage}</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: COLORS.darkGray,
    borderRadius: 7
  },
  label: {
    color: COLORS.lightGray,
    fontWeight: '500'
  },
  inputView: {
    marginTop: 10
  },
  inputText: {
    color: COLORS.darkGray
  },
  invalid: {
    marginTop: 3,
    marginLeft: 2,
    color: COLORS.red,
    fontSize: 10
  }
})
