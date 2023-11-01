import axios from 'axios'
import { MMKV } from 'react-native-mmkv'

const axiosApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosApi.interceptors.request.use(
  async (config) => {
    const storage = new MMKV()
    const token = storage.getString('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export { axiosApi }
