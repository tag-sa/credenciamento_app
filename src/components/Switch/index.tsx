import { Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../constants/Colors'
import { IMAGES } from '../../constants/Images'

interface SwitchProps {
  isEnabled: boolean
  toggleSwitch: () => void
  fieldWidth?: number
  fieldHeight?: number
  activeColor?: string
  inactiveColor?: string
  buttonSize?: number
  borderActiveColor?: string
  borderInactiveColor?: string
  activeText?: string
  inactiveText?: string
  activeTextColor?: string
  inactiveTextColor?: string
  activeTextSize?: number
  inactiveTextSize?: number
  activeFontWeight?: any
  inactiveFontWeight?: string
}

export const Switch = ({
  borderActiveColor = COLORS.darkBlue,
  borderInactiveColor = COLORS.lightGray,
  isEnabled,
  toggleSwitch,
  activeColor = 'rgba(8, 81, 136, 0.5)',
  inactiveColor = COLORS.white,
  fieldHeight = 15,
  fieldWidth = 55,
  buttonSize = 25,
  activeText,
  inactiveText,
  activeTextColor = COLORS.darkBlue,
  activeTextSize,
  activeFontWeight,
  inactiveTextColor = COLORS.lightBlue,
  inactiveTextSize,
  inactiveFontWeight
}: SwitchProps) => {
  return (
    <TouchableOpacity onPress={toggleSwitch} style={{ alignItems: 'center', flexDirection: 'row' }}>
      <Text
        style={{
          color: isEnabled ? activeTextColor : inactiveTextColor,
          fontWeight: isEnabled ? activeFontWeight : inactiveFontWeight,
          marginRight: 10
        }}
      >
        {isEnabled ? activeText : inactiveText}
      </Text>
      <View
        style={{
          width: fieldWidth,
          height: fieldHeight,
          borderRadius: 15,
          borderColor: isEnabled ? borderActiveColor : borderInactiveColor,
          borderWidth: isEnabled ? 0 : 1,
          backgroundColor: isEnabled ? activeColor : inactiveColor,
          justifyContent: 'center',
          alignItems: isEnabled ? 'flex-end' : 'flex-start'
        }}
      >
        <IMAGES.ICONS.SwitchButton
          height={buttonSize}
          width={buttonSize}
          style={{
            shadowColor: '#000',
            shadowOpacity: 0.3,
            shadowOffset: {
              width: 0,
              height: 0
            }
          }}
        />
      </View>
    </TouchableOpacity>
  )
}
