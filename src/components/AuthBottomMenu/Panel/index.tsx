import { View, Text } from 'react-native'
import { menuItemStyle } from '../styles'
import { IMAGES } from '../../../constants/Images'

interface MenuItemProps {
  focused: boolean
}

export default function PanelItem({ focused }: MenuItemProps) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {focused && <IMAGES.MENU.PanelActive />}
      {!focused && <IMAGES.MENU.Panel />}

      <Text style={[menuItemStyle.label, focused ? menuItemStyle.activeLabel : {}]}>Painel</Text>
    </View>
  )
}
