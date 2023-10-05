import { NavigationContainer } from '@react-navigation/native'
import FlashMessage from 'react-native-flash-message'
import { MyStack } from './navigation/Stack'

export const Router = () => {
  return (
    <NavigationContainer>
      <FlashMessage position="top" />
      <MyStack />
    </NavigationContainer>
  )
}
