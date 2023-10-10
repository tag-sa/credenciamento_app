import { Pressable, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../constants/Colors'

interface InputProps {
  value?: string[]
  placeholder?: string
  onInputPress?: (_) => void
  marginTop?: number
  marginBottom?: number

  textColor?: string
  textWeight?: 'normal' | 'bold'

  addrRef?: any
}

export default function CustomSelectInputCheckbox(props: InputProps) {
  return (
    <>
      <Pressable onPress={props.onInputPress}>
        <View
          style={{
            ...styles.input,
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
            borderColor: COLORS.darkGray
          }}
        >
          <Text style={styles.inputText}>
            {!props.value.length && props.placeholder}
            {props.value && props.value.length > 0 && (
              <>
                {props.value.length > 2 && (
                  <>
                    {props.value[0]}, {props.value[1]}, +{props.value.length - 2}
                  </>
                )}
                {props.value.length <= 2 && (
                  <>
                    {props.value[0]}
                    {props.value.length > 1 && <>, {props.value[1]}</>}
                  </>
                )}
              </>
            )}
          </Text>
        </View>
      </Pressable>
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
  inputText: {
    paddingVertical: 10,
    color: COLORS.darkGray
  },
  invalid: {
    marginTop: 3,
    marginLeft: 2,
    color: COLORS.red,
    fontSize: 10
  }
})
