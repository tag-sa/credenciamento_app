import { Text, TouchableOpacity } from 'react-native'
import { COLORS } from '../../constants/Colors'

interface ButtonProps {
  buttonEnabled?: boolean
  onPress: () => void
  label: string
  width?: number
  height?: number
  marginTop?: number
  borderRadius?: number
  textColor?: string
  fontSize?: number
  buttonEnabledColor?: string
  buttonDisabledColor?: string
}

export default function Button({
  label,
  onPress,
  buttonEnabled = true,
  height = 50,
  marginTop = 20,
  width = 250,
  borderRadius = 10,
  buttonDisabledColor = COLORS.lightBlue,
  buttonEnabledColor = COLORS.darkBlue,
  fontSize = 18,
  textColor = COLORS.white
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        backgroundColor: buttonEnabled ? buttonEnabledColor : buttonDisabledColor,
        borderRadius,
        height,
        marginTop,
        justifyContent: 'center',
        alignItems: 'center',
        width,
        alignSelf: 'center'
      }}
      onPress={() => {
        if (buttonEnabled) {
          onPress()
        }
      }}
    >
      <Text
        style={{
          color: textColor,
          fontSize,
          fontWeight: 'bold',
          letterSpacing: 1.2
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}
