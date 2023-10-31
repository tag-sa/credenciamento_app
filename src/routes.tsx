import { NavigationContainer } from '@react-navigation/native'
import FlashMessage from 'react-native-flash-message'
import { MyDrawer } from './navigation/Drawer'

export const Router = () => {
  return (
    <NavigationContainer>
      <FlashMessage position="top" />
      <MyDrawer />
    </NavigationContainer>
  )
}
