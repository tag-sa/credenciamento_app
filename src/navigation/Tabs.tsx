import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useEffect, useState } from 'react'
import { COLORS } from '../constants/Colors'
import { UserType } from '../model/user.model'
import { AdvertiserScreen } from '../pages/(auth)/Advertiser'
import { DashboardScreen } from '../pages/(auth)/Dashboard'
import { JobsScreen } from '../pages/(auth)/Jobs'
import { ProfileScreen } from '../pages/(auth)/Profile'
import { auth } from '../services/auth'

import AdvertiserItem from '../components/AuthBottomMenu/Advertiser'
import HomeItem from '../components/AuthBottomMenu/Home'
import JobsItem from '../components/AuthBottomMenu/Jobs'
import ProfileItem from '../components/AuthBottomMenu/Profile'
import { HeaderComponent } from '../components/Header'
import { IMAGES } from '../constants/Images'
import { AdvertiverAddScreen } from '../pages/(auth)/AdvertiserAdd'
import { AdvertiserDashboardScreen } from '../pages/(auth)/AdvertiserDashboard'
import { AdvertiverEventAddScreen } from '../pages/(auth)/AdvertiserEventAdd'
import { AdvertiserEventDashboardScreen } from '../pages/(auth)/AdvertiserEventDashboard'
import { AdvertiverEventTeamAddScreen } from '../pages/(auth)/AdvertiserEventTeamAdd'
import { AdvertiserEventTeamAddCreatedShareScreen } from '../pages/(auth)/AdvertiserEventTeamAddCreatedShare'
import { AdvertiserEventTeamDashboardScreen } from '../pages/(auth)/AdvertiserEventTeamDashboard'
import { AdvertiverPlaceAddScreen } from '../pages/(auth)/AdvertiserPlaceAdd'
import { WorkerProfiledScreen } from '../pages/(auth)/WorkerProfile'

const Tab = createBottomTabNavigator()

export function MyTabs({ route }) {
  const { screenName } = route.params
  const [user, setUser] = useState<UserType>()

  useEffect(() => {
    async function load() {
      const user = await auth().getUser()

      setUser(user)
    }

    load()
  }, [])

  return (
    <Tab.Navigator
      initialRouteName={screenName}
      screenOptions={() => ({
        headerTitle: '',
        headerStyle: {
          shadowRadius: 0,
          shadowOffset: {
            width: 0,
            height: 0
          }
        },
        tabBarStyle: {
          paddingTop: 10,
          borderTopStartRadius: 30,
          shadowRadius: 5,
          shadowColor: COLORS.lightGray,
          shadowOffset: {
            width: 0,
            height: 0
          },
          shadowOpacity: 0.7
        },

        header: () => <HeaderComponent />
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: ({ focused }) => <HomeItem focused={focused} />
        }}
      />

      {user?.type === 'pj' && (
        <Tab.Screen
          name="Advertiser"
          component={AdvertiserScreen}
          options={{
            tabBarLabel: ({ focused }) => <AdvertiserItem focused={focused} />
          }}
        />
      )}

      {user?.type === 'pf' && (
        <Tab.Screen
          name="Jobs"
          component={JobsScreen}
          options={{
            tabBarLabel: ({ focused }) => <JobsItem focused={focused} />
          }}
        />
      )}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ focused }) => <ProfileItem focused={focused} />
        }}
      />

      <Tab.Screen
        name="AdvertiverAddScreen"
        options={{
          tabBarButton: () => null
        }}
        component={AdvertiverAddScreen}
      />

      <Tab.Screen
        name="AdvertiserDashboardScreen"
        options={{
          header: () => <HeaderComponent backgroundColor={COLORS.darkBlue} LeftIcon={IMAGES.ICONS.HamburguerWhite} />,
          tabBarButton: () => null
        }}
        component={AdvertiserDashboardScreen}
      />
      <Tab.Screen
        name="AdvertiverPlaceAddScreen"
        options={{
          tabBarButton: () => null
        }}
        component={AdvertiverPlaceAddScreen}
      />
      <Tab.Screen name="AdvertiverEventAddScreen" component={AdvertiverEventAddScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="AdvertiverEventTeamAddScreen" component={AdvertiverEventTeamAddScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen
        name="AdvertiserEventTeamAddCreatedShareScreen"
        component={AdvertiserEventTeamAddCreatedShareScreen}
        options={{ tabBarButton: () => null, header: () => <HeaderComponent backgroundColor={COLORS.darkBlue} LeftIcon={IMAGES.ICONS.HamburguerWhite} /> }}
      />

      <Tab.Screen
        name="AdvertiserEventDashboardScreen"
        component={AdvertiserEventDashboardScreen}
        options={{
          header: () => <HeaderComponent backgroundColor={COLORS.darkBlue} LeftIcon={IMAGES.ICONS.HamburguerWhite} />,
          tabBarButton: () => null
        }}
      />
      <Tab.Screen
        name="AdvertiserEventTeamDashboardScreen"
        component={AdvertiserEventTeamDashboardScreen}
        options={{
          header: () => <HeaderComponent backgroundColor={COLORS.darkBlue} LeftIcon={IMAGES.ICONS.HamburguerWhite} />,
          tabBarButton: () => null
        }}
      />
      <Tab.Screen
        name="WorkerProfiledScreen"
        component={WorkerProfiledScreen}
        options={{
          header: () => <HeaderComponent backgroundColor={COLORS.darkBlue} LeftIcon={IMAGES.ICONS.HamburguerWhite} />,
          tabBarButton: () => null
        }}
      />
    </Tab.Navigator>
  )
}
