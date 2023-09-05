import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { auth } from "../../../services/auth";
import { UserType } from "../../../model/user.model";

export default function Advertiser() {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    async function load() {
      const user = await auth().getUser();

      setUser(user);
    }

    load();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text>Advertiver</Text>
    </View>
  );
}
