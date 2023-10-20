import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { UserType } from '../../../model/user.model'
import { useUserStore } from '../../../store/user.store'

export const AdvertiserScreen = ({ navigation }) => {
  const { getUser } = useUserStore()
  const [user, setUser] = useState<UserType>()

  useEffect(() => {
    async function load() {
      const user = getUser()

      setUser(user)
    }

    load()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Text>Advertiver</Text>
    </View>
  )
}
