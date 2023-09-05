import { Tabs } from "expo-router";
import { COLORS } from "../../../constants";
import React from "react";
import HomeItem from "../../components/AuthBottomMenu/Home";
import AdvertiserItem from "../../components/AuthBottomMenu/Advertiser";
import ProfileItem from "../../components/AuthBottomMenu/Profile";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
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
      }}
    >
      <Tabs.Screen
        name="dashboard/index"
        options={{
          tabBarLabel: ({ focused }) => <HomeItem focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="advertiser/index"
        options={{
          tabBarLabel: ({ focused }) => <AdvertiserItem focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          tabBarLabel: ({ focused }) => <ProfileItem focused={focused} />,
        }}
      />
    </Tabs>
  );
}
