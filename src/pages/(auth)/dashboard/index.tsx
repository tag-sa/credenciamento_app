import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { auth } from "../../../services/auth";
import { UserType } from "../../../model/user.model";

export const DashboardScreen = ({ navigation }) => {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    async function load() {
      const user = await auth().getUser();

      setUser(user);
    }

    load();
  }, []);

  return (
    <View style={{ backgroundColor: "red" }}>
      <Text>Home {JSON.stringify(user, null, 2)}</Text>
    </View>
  );
};
