import { useNavigation } from '@react-navigation/native'
import { FC } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SvgProps } from 'react-native-svg'
import { COLORS } from '../../constants/Colors'
import { IMAGES } from '../../constants/Images'
import { PADDINGS } from '../../constants/Paddings'

interface HeaderComponentProps {
  LeftIcon?: FC<SvgProps>
  RightIcon?: FC<SvgProps>
  backgroundColor?: string
}
export const HeaderComponent = ({ backgroundColor = COLORS.white, LeftIcon = IMAGES.ICONS.Hamburguer, RightIcon = IMAGES.ICONS.TopProfile }: HeaderComponentProps) => {
  const { top } = useSafeAreaInsets()
  const navigation = useNavigation<any>()

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: backgroundColor,
        paddingHorizontal: PADDINGS.horizontal,
        paddingTop: top
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer()
        }}
      >
        <LeftIcon />
      </TouchableOpacity>

      <RightIcon />
    </View>
  )
}
