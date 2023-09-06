import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "./pages/(public)/Login";
import { DashboardScreen } from "./pages/(auth)/dashboard";
import { AccountCreateScreen } from "./pages/(public)/AccountCreate";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Advertiser from "./pages/(auth)/advertiser";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="DashboardTab" component={DashboardScreen} />
      <Tab.Screen name="Advertiser" component={Advertiser} />
    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="AccountCreate" component={AccountCreateScreen} />
      <Stack.Screen name="Dashboard" component={MyTabs} />
    </Stack.Navigator>
  );
}

export const Router = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="DashboardDrawer" component={MyStack} />
        <Drawer.Screen name="AdvertiserDrawer" component={Advertiser} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
