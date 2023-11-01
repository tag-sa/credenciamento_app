import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useEffect, useState } from 'react'
import AdvertiserItem from '../components/AuthBottomMenu/Advertiser'
import HomeItem from '../components/AuthBottomMenu/Home'
import ProfileItem from '../components/AuthBottomMenu/Profile'
import { HeaderComponent } from '../components/Header'
import { COLORS } from '../constants/Colors'
import { IMAGES } from '../constants/Images'
import { UserType } from '../model/user.model'
import { AdvertiserScreen } from '../pages/(auth)/Advertiser'
import { AdvertiverAddScreen } from '../pages/(auth)/AdvertiserAdd'
import { AdvertiserDashboardScreen } from '../pages/(auth)/AdvertiserDashboard'
import { AdvertiverEventAddScreen } from '../pages/(auth)/AdvertiserEventAdd'
import { AdvertiserEventDashboardScreen } from '../pages/(auth)/AdvertiserEventDashboard'
import { AdvertiverEventTeamAddScreen } from '../pages/(auth)/AdvertiserEventTeamAdd'
import { AdvertiserEventTeamAddCreatedShareScreen } from '../pages/(auth)/AdvertiserEventTeamAddCreatedShare'
import { AdvertiserEventTeamDashboardScreen } from '../pages/(auth)/AdvertiserEventTeamDashboard'
import { AdvertiverPlaceAddScreen } from '../pages/(auth)/AdvertiserPlaceAdd'
import { DashboardScreen } from '../pages/(auth)/Dashboard'
import { ProfileScreen } from '../pages/(auth)/Profile'
import { ProfileAddQualificationScreen } from '../pages/(auth)/ProfileAddQualification'
import { WorkerProfiledScreen } from '../pages/(auth)/WorkerProfile'
import { useUserStore } from '../store/user.store'

const Tab = createBottomTabNavigator()

export function MyTabs({ route }) {
  const { screenName } = route.params
  const { getUser } = useUserStore()
  const [user, setUser] = useState<UserType>()
  async function load() {
    const user = getUser()

    setUser(user)
  }

  useEffect(() => {
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
          position: 'absolute',
          bottom: 0,
          paddingVertical: 15,
          borderTopStartRadius: 30,
          borderStartWidth: 1,
          borderColor: COLORS.lightGray,
          height: 70
        },
        tabBarLabel: () => null,
        header: () => <HeaderComponent />
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => <HomeItem focused={focused} />
        }}
      />

      {user?.type === 'pj' && (
        <Tab.Screen
          name="Advertiser"
          component={AdvertiserScreen}
          options={{
            tabBarIcon: ({ focused }) => <AdvertiserItem focused={focused} />
          }}
        />
      )}

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: () => <HeaderComponent backgroundColor={COLORS.darkBlue} LeftIcon={IMAGES.ICONS.HamburguerWhite} RightIcon={IMAGES.ICONS.IconProfileWhiteBackground} />,
          tabBarIcon: ({ focused }) => <ProfileItem focused={focused} />
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
      <Tab.Screen
        name="ProfileAddQualificationScreen"
        component={ProfileAddQualificationScreen}
        options={{
          tabBarButton: () => null
        }}
      />
    </Tab.Navigator>
  )
}
