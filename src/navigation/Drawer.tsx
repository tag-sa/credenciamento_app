import { createDrawerNavigator } from "@react-navigation/drawer";
import { MyTabs } from "./Tabs";
import { useState, useEffect } from "react";
import { UserType } from "../model/user.model";
import { auth } from "../services/auth";
import { AdvertiverAddScreen } from "../pages/(auth)/AdvertiserAdd";

const Drawer = createDrawerNavigator();

export const MyDrawer = () => {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    async function load() {
      const user = await auth().getUser();

      setUser(user);
    }

    load();
  }, []);

  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="DashboardDrawer"
        options={{ title: "Dashboard" }}
        component={MyTabs}
        initialParams={{ screenName: "Dashboard" }}
      />

      {user?.type == "pj" && (
        <Drawer.Screen
          name="AdvertiserDrawer"
          options={{ title: "Anunciante" }}
          component={MyTabs}
          initialParams={{ screenName: "Advertiser" }}
        />
      )}

      {user?.type == "pf" && (
        <Drawer.Screen
          name="JobsDrawer"
          options={{ title: "Vagas" }}
          component={MyTabs}
          initialParams={{ screenName: "Jobs" }}
        />
      )}

      <Drawer.Screen
        name="ProfileDrawer"
        options={{ title: "Perfil" }}
        component={MyTabs}
        initialParams={{ screenName: "Profile" }}
      />
      {/* 
      <Drawer.Screen
        name="AdvertiverAddScreen"
        options={{ drawerItemStyle: { display: "none" } }}
        component={AdvertiverAddScreen}
      /> */}
    </Drawer.Navigator>
  );
};
