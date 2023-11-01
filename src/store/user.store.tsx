import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { UserType } from '../model/user.model'
import { MMKV } from 'react-native-mmkv'

interface IUserStore {
  user: UserType | null
  setUser: (user: UserType) => void
  getUser: () => UserType | null
  logout: (navigation: any) => void
  setAvatar: (avatar: string) => void
}

const storage = new MMKV()

const MMKVStorage = {
  getItem: (key: string) => {
    const value = storage.getString(key)
    return value ? Promise.resolve(value) : Promise.reject(null)
  },
  setItem: (key: string, value: string) => Promise.resolve(storage.set(key, value)),
  removeItem: (key: string) => Promise.resolve(storage.delete(key))
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set, get) => ({
      user: null,
      getUser: () => {
        return get().user
      },
      setUser: (user: UserType) => {
        set({ user })
      },
      logout: async (navigation) => {
        set({ user: null })
        // storage.delete('token')
        MMKVStorage.removeItem('token')

        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }]
        })
      },
      setAvatar: (avatar: string) => {
        const user = get().user
        if (user) {
          user.avatarUrl = avatar
          set({ user })
        }
      }
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => MMKVStorage)
    }
  )
)
