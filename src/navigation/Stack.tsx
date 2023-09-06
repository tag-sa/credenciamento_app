import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyDrawer } from "./Drawer";
import { LoginScreen } from "../pages/(public)/Login";
import { AccountCreateScreen } from "../pages/(public)/AccountCreate";

const Stack = createNativeStackNavigator();

export const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Dashboard" component={MyDrawer} />
      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="AccountCreate" component={AccountCreateScreen} />
    </Stack.Navigator>
  );
};
