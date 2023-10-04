import { NavigationContainer } from '@react-navigation/native'
import { Dimensions, Platform, SafeAreaView } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import { MyStack } from './navigation/Stack'

export const Router = () => {
  return (
    <NavigationContainer>
      <SafeAreaView
        style={{
          ...{},
          ...Platform.select({
            android: {
              backgroundColor: 'red',
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
              position: 'absolute',
              bottom: 0
            }
          })
        }}
      >
        <FlashMessage position="top" />
        <MyStack />
      </SafeAreaView>
    </NavigationContainer>
  )
}
