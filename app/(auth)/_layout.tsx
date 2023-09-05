import { Drawer } from "expo-router/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        swipeEdgeWidth: 0,
        headerStyle: {
          backgroundColor: "#fff",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerRight: () => {
          return (
            <View style={{ marginRight: 16 }}>
              <Ionicons name="md-checkmark-circle" size={32} color="green" />
            </View>
          );
        },
      }}
    >
      {/* <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Dashboard",
          drawerItemStyle: {
            height: 0,
          },
        }}
      />

      <Drawer.Screen
        name="dashboard/index"
        options={{
          drawerLabel: "Dashboard",
          title: "Dashboard",
        }}
      /> */}
    </Drawer>
  );
}
