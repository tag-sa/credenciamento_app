import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DashboardScreen } from "../pages/(auth)/dashboard";
import { AdvertiserScreen } from "../pages/(auth)/advertiser";
import { TouchableOpacity, View, Image } from "react-native";
import { ProfileScreen } from "../pages/(auth)/profile";
import { COLORS } from "../constants/Colors";
import HomeItem from "../components/AuthBottomMenu/Home";
import AdvertiserItem from "../components/AuthBottomMenu/Advertiser";
import ProfileItem from "../components/AuthBottomMenu/Profile";
import { useEffect, useState } from "react";
import { auth } from "../services/auth";
import { UserType } from "../model/user.model";
import JobsItem from "../components/AuthBottomMenu/Jobs";
import { JobsScreen } from "../pages/(auth)/jobs";

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

  console.log(screenName, user?.type);
  return (
    <Tab.Navigator
      initialRouteName={screenName}
      screenOptions={({ navigation }) => ({
        headerTitle: "",
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

        headerLeft: ({}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.toggleDrawer();
              }}
            >
              <View style={{ marginLeft: 16 }}>
                <Image
                  source={require("../../assets/images/icons/icon-menu.png")}
                />
              </View>
            </TouchableOpacity>
          );
        },
        headerRight: () => {
          return (
            <View style={{ marginRight: 16 }}>
              <Image
                source={require("../../assets/images/icons/icon-profile-top.png")}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: ({ focused }) => <HomeItem focused={focused} />,
        }}
      />

      {user?.type == "pj" && (
        <Tab.Screen
          name="Advertiser"
          component={AdvertiserScreen}
          options={{
            tabBarLabel: ({ focused }) => <AdvertiserItem focused={focused} />,
          }}
        />
      )}

      {user?.type == "pf" && (
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
    </Tab.Navigator>
  );
}
