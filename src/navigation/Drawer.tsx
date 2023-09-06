import { createDrawerNavigator } from "@react-navigation/drawer";
import { MyTabs } from "./Tabs";

const Drawer = createDrawerNavigator();
export const MyDrawer = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="DashboardDrawer"
        component={MyTabs}
        initialParams={{ screenName: "Dashboard" }}
      />
      <Drawer.Screen
        name="AdvertiserDrawer"
        component={MyTabs}
        initialParams={{ screenName: "Advertiser" }}
      />
      <Drawer.Screen
        name="ProfileDrawer"
        component={MyTabs}
        initialParams={{ screenName: "Profile" }}
      />
    </Drawer.Navigator>
  );
};
