import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer'
import * as Application from 'expo-application'
import Constants from 'expo-constants'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from '../components/Avatar'
import { HeaderComponent } from '../components/Header'
import { COLORS } from '../constants/Colors'
import { IMAGES } from '../constants/Images'
import { PADDINGS } from '../constants/Paddings'
import { UserType } from '../model/user.model'
import { SettingsPage } from '../pages/(auth)/Settings'
import { AccountCreateScreen } from '../pages/(public)/AccountCreate'
import { LoginScreen } from '../pages/(public)/Login'
import { useUserStore } from '../store/user.store'
import { MyTabs } from './Tabs'

const Drawer = createDrawerNavigator()

export const MyDrawer = () => {
  const { getUser, logout } = useUserStore()
  const [user, setUser] = useState<UserType>()
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    async function load() {
      const user = getUser()
      setUser(user)
    }

    load()
  }, [])

  const getVersion = () => {
    if (Constants.appOwnership === 'expo') {
      return require('../../package.json').version
    }
    return Application.nativeApplicationVersion
  }

  const CustomDrawerContent = (props: any) => {
    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        <View
          style={{
            justifyContent: 'space-between',
            flex: 1,
            paddingHorizontal: PADDINGS.horizontal * 2,
            paddingBottom: 50
          }}
        >
          <View style={{ marginTop: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Avatar height={35} width={35} borderWidth={0} />
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.darkBlue }}>Olá {user?.name}</Text>
            </View>
            <View style={{ marginTop: 40, gap: 10 }}>
              <TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10, paddingVertical: 15 }}>
                  <IMAGES.DRAWER.Horn />
                  <Text style={{ color: COLORS.darkBlue, fontWeight: 'bold' }}>Gestão do Anunciante</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => props.navigation.navigate('Settings')}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10, paddingVertical: 15 }}>
                  <IMAGES.DRAWER.Settings />
                  <Text style={{ color: COLORS.darkBlue, fontWeight: 'bold' }}>Configurações</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10, paddingVertical: 15 }}>
                  {!notifications.length ? <IMAGES.DRAWER.Notifications /> : <IMAGES.DRAWER.NotificationsActive />}
                  <Text style={{ color: COLORS.darkBlue, fontWeight: 'bold' }}>Notificações</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10, paddingVertical: 15 }}>
                  <IMAGES.DRAWER.Faq />
                  <Text style={{ color: COLORS.darkBlue, fontWeight: 'bold' }}>FAQ</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={{ color: COLORS.darkGray, fontWeight: 'bold', fontSize: 15, paddingVertical: 5 }}>Política de Privacidade</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <Text style={{ color: COLORS.darkGray, fontWeight: 'bold', fontSize: 15, paddingVertical: 5 }}>Termos e Condições de Uso</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ color: COLORS.darkGray, fontWeight: 'bold', fontSize: 15, marginTop: 20, paddingVertical: 5 }}>Vem ser Premium!</Text>
            </TouchableOpacity> 
            <TouchableOpacity>
              <Text style={{ color: COLORS.darkGray, fontWeight: 'bold', fontSize: 15, paddingVertical: 5 }}>Seguro Empresarial</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={async () => {
                await logout(props.navigation)
              }}
            >
              <Text style={{ color: COLORS.darkBlue, fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>Sair</Text>
            </TouchableOpacity>
            <Text style={{ color: COLORS.darkGray, fontWeight: 'bold', fontSize: 13, marginTop: 1 }}>versão {getVersion()}</Text>
          </View>
        </View>
      </DrawerContentScrollView>
    )
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: '85%',
          borderTopRightRadius: 120
        }
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Login"
    >
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{
          swipeEdgeWidth: 0
        }}
      />
      <Drawer.Screen name="AccountCreate" component={AccountCreateScreen} />
      <Drawer.Screen name="Settings" options={{ title: 'Configurações', headerShown: true, swipeEdgeWidth: 0, header: () => <HeaderComponent /> }} component={SettingsPage} />
      <Drawer.Screen name="DashboardDrawer" options={{ title: 'Dashboard' }} component={MyTabs} initialParams={{ screenName: 'Dashboard' }} />

      {/* {user?.type == 'pj' && <Drawer.Screen name="AdvertiserDrawer" options={{ title: 'Anunciante' }} component={MyTabs} initialParams={{ screenName: 'Advertiser' }} />}

      {user?.type == 'pf' && <Drawer.Screen name="JobsDrawer" options={{ title: 'Vagas' }} component={MyTabs} initialParams={{ screenName: 'Jobs' }} />}

      <Drawer.Screen name="ProfileDrawer" options={{ title: 'Perfil' }} component={MyTabs} initialParams={{ screenName: 'Profile' }} /> */}
      {/* 
      <Drawer.Screen
        name="AdvertiverAddScreen"
        options={{ drawerItemStyle: { display: "none" } }}
        component={AdvertiverAddScreen}
      /> */}
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({})
