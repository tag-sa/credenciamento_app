import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "./pages/(public)/Login";
import { DashboardScreen } from "./pages/(auth)/dashboard";
import { AccountCreateScreen } from "./pages/(public)/AccountCreate";

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

export const Routes = () => {
  // const ProductListWithDrawer = () => {
  //   return (
  //     <Drawer.Navigator initialRouteName="ProductList">
  //       <Drawer.Screen name="ProductList" component={DashboardScreen} />
  //     </Drawer.Navigator>
  //   );
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="AccountCreate" component={AccountCreateScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />

        {/* <Stack.Screen name="ProductList" component={ProductListWithDrawer} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
