import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DashboardScreen } from "../pages/(auth)/Dashboard";
import { AdvertiserScreen } from "../pages/(auth)/Advertiser";
import { ProfileScreen } from "../pages/(auth)/Profile";
import { COLORS } from "../constants/Colors";
import { useEffect, useState } from "react";
import { auth } from "../services/auth";
import { UserType } from "../model/user.model";
import { JobsScreen } from "../pages/(auth)/Jobs";

import { AdvertiserDashboardScreen } from "../pages/(auth)/AdvertiserDashboard";
import { HeaderComponent } from "../components/Header";
import { IMAGES } from "../constants/Images";
import HomeItem from "../components/AuthBottomMenu/Home";
import AdvertiserItem from "../components/AuthBottomMenu/Advertiser";
import ProfileItem from "../components/AuthBottomMenu/Profile";
import JobsItem from "../components/AuthBottomMenu/Jobs";
import { AdvertiverAddScreen } from "../pages/(auth)/AdvertiserAdd";
import { AdvertiverPlaceAddScreen } from "../pages/(auth)/AdvertiserPlaceAdd";
import { AdvertiverEventAddScreen } from "../pages/(auth)/AdvertiserEventAdd";

const Tab = createBottomTabNavigator();

export function MyTabs({ route }) {
  const { screenName } = route.params;

  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    async function load() {
      const user = await auth().getUser();

      setUser(user);
    }

    load();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={screenName}
      screenOptions={() => ({
        headerTitle: "",
        headerStyle: {
          shadowRadius: 0,
          shadowOffset: {
            width: 0,
            height: 0,
          },
        },
        tabBarStyle: {
          paddingTop: 10,
          borderTopStartRadius: 30,
          shadowRadius: 5,
          shadowColor: COLORS.grayColor,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.7,
        },

        header: () => <HeaderComponent />,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: ({ focused }) => <HomeItem focused={focused} />,
        }}
      />

      {user?.type === "pj" && (
        <Tab.Screen
          name="Advertiser"
          component={AdvertiserScreen}
          options={{
            tabBarLabel: ({ focused }) => <AdvertiserItem focused={focused} />,
          }}
        />
      )}

      {user?.type === "pf" && (
        <Tab.Screen
          name="Jobs"
          component={JobsScreen}
          options={{
            tabBarLabel: ({ focused }) => <JobsItem focused={focused} />,
          }}
        />
      )}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ focused }) => <ProfileItem focused={focused} />,
        }}
      />

      <Tab.Screen
        name="AdvertiverAddScreen"
        options={{
          tabBarButton: () => null,
        }}
        component={AdvertiverAddScreen}
      />

      <Tab.Screen
        name="AdvertiserDashboardScreen"
        options={{
          header: () => (
            <HeaderComponent
              backgroundColor={COLORS.primaryColor}
              LeftIcon={IMAGES.ICONS.HamburguerWhite}
            />
          ),
          tabBarButton: () => null,
        }}
        component={AdvertiserDashboardScreen}
      />
      <Tab.Screen
        name="AdvertiverPlaceAddScreen"
        options={{
          tabBarButton: () => null,
        }}
        component={AdvertiverPlaceAddScreen}
      />
      <Tab.Screen
        name="AdvertiverEventAddScreen"
        options={{
          tabBarButton: () => null,
        }}
        component={AdvertiverEventAddScreen}
      />
    </Tab.Navigator>
  );
}
