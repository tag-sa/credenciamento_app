import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DashboardScreen } from "../pages/(auth)/dashboard";
import { AdvertiserScreen } from "../pages/(auth)/advertiser";
import { TouchableOpacity, View, Image } from "react-native";
import { ProfileScreen } from "../pages/(auth)/profile";
import { COLORS } from "../constants/Colors";
import HomeItem from "../components/AuthBottomMenu/Home";
import AdvertiserItem from "../components/AuthBottomMenu/Advertiser";
import ProfileItem from "../components/AuthBottomMenu/Profile";

const Tab = createBottomTabNavigator();

export function MyTabs({ route }) {
  const { screenName } = route.params;

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
      <Tab.Screen
        name="Advertiser"
        component={AdvertiserScreen}
        options={{
          tabBarLabel: ({ focused }) => <AdvertiserItem focused={focused} />,
        }}
      />
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
