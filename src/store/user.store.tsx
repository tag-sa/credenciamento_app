import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { UserType } from '../model/user.model'

interface IUserStore {
  user: UserType | null
  setUser: (user: UserType) => void
  getUser: () => UserType | null
  logout: (navigation: any) => void
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set, get) => ({
      user: null,
      getUser: () => {
        return get().user
      },
      setUser: (user: UserType) => set({ user }),
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
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)
