import { Image, View } from 'react-native'
import { COLORS } from '../../constants/Colors'

interface AvatarProps {
  width?: number
  height?: number
  borderRadius?: number
  borderColor?: string
  borderWidth?: number
  uri: string
}

export const Avatar = ({ uri, width = 50, height = 50, borderRadius = 50, borderColor = COLORS.darkBlue, borderWidth = 2 }: AvatarProps) => {
  return (
    <View
      style={{
        width,
        height,
        borderRadius,
        overflow: 'hidden',
        borderColor,
        borderWidth,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Image style={{ width, height }} source={{ uri }} />
    </View>
  )
}
