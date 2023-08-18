import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { auth } from "../../services/auth";

export default function Dashboard() {
  const { top } = useSafeAreaInsets();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function load() {
      const user = await auth().getUser();

      setUser(user);
    }

    load();
  }, []);

  return (
    <View style={{ paddingTop: top, backgroundColor: "red", flex: 1 }}>
      <Text>Dashboardaaa {user?.name}</Text>
    </View>
  );
}
