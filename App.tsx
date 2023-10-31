import { NavigationContainer } from '@react-navigation/native'
import FlashMessage from 'react-native-flash-message'
import Loading from './src/components/Loading/Loading'
import { MyDrawer } from './src/navigation/Drawer'
import { StatusBar } from 'expo-status-bar'

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Loading />
      <MyDrawer />
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}
