import { Text, Image, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../constants/Colors'
import { DialogModalBottomSheet } from '../DialogModalBottom'
import { useEffect, useState } from 'react'
import { useUserStore } from '../../store/user.store'

interface AvatarProps {
  width?: number
  height?: number
  borderRadius?: number
  borderColor?: string
  borderWidth?: number
  uri?: string
  click?: () => void
}

export const Avatar = ({ click, uri, width = 50, height = 50, borderRadius = 50, borderColor = COLORS.darkBlue, borderWidth = 2 }: AvatarProps) => {
  const { getUser } = useUserStore()
  const [imagePath, setImagePath] = useState('')
  const [userType, setUserType] = useState('')

  useEffect(() => {
    const user = getUser()
    setUserType(user?.type)

    if (uri) {
      setImagePath(uri)
    } else {
      if (user?.avatarUrl) {
        setImagePath(user.avatarUrl)
      }
    }
  }, [])

  return (
    <TouchableOpacity onPress={click}>
      <View
        style={{
          width,
          height,
          borderRadius,
          overflow: 'hidden',
          borderColor,
          borderWidth,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: !imagePath ? COLORS.white : 'transparent'
        }}
      >
        {!imagePath && (
          <Text
            style={{
              color: COLORS.darkGray,
              fontSize: 12,
              fontWeight: 'bold'
            }}
          >
            {userType === 'pf' ? 'Adicionar foto' : 'Adicionar marca'}
          </Text>
        )}
        {imagePath && <Image style={{ width, height }} source={{ uri: imagePath }} />}
      </View>
    </TouchableOpacity>
  )
}
