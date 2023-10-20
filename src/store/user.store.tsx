import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IUser {
  id: number
  name: string
  document: string
  birthdate?: string
  nickname: string
  email: string
  type: 'pf' | 'pj'
  score?: number
  about?: string
}

interface IUserStore {
  user: IUser | null
  setUser: (user: IUser) => void
  getUser: () => IUser | null
  logout: (navigation: any) => void
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set, get) => ({
      user: null,
      getUser: () => {
        return get().user
      },
      setUser: (user: IUser) => set({ user }),
      logout: async (navigation) => {
        set({ user: null })
        await AsyncStorage.removeItem('token')
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }]
        })
      }
    }),
    {
      name: 'user-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage) // (optional) by default, 'localStorage' is used
    }
  )
)
