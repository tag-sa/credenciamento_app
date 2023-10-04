import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserType } from '../model/user.model'

interface AuthProps {
  getUser?(): Promise<UserType>
  setUser?(user: UserType): Promise<void>
  setToken?(token: string): Promise<void>
  getToken?(): Promise<string>
}

export const auth = (): AuthProps => {
  const getUser = async (): Promise<UserType> => {
    const user = await AsyncStorage.getItem('user')
    // await AsyncStorage.removeItem("user");
    // await AsyncStorage.removeItem("token");

    return user ? JSON.parse(user) : null
  }

  const setUser = async (user: UserType): Promise<void> => {
    await AsyncStorage.setItem('user', JSON.stringify(user))
  }

  const setToken = async (token: string): Promise<void> => {
    await AsyncStorage.setItem('token', token)
  }

  const getToken = async () => {
    const user = await getUser()

    return user ? user.access_token : null
  }

  return {
    getUser,
    setUser,
    setToken,
    getToken
  }
}
