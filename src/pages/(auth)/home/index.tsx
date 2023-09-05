import { useEffect, useState } from "react";
import { View, Text, Touchable, TouchableOpacity } from "react-native";
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
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Text>Home {JSON.stringify(user, null, 2)}</Text>
      {/* <TouchableOpacity onPress={() => navigation.open()}>
        {" "}
        <Text>AAAA</Text>{" "}
      </TouchableOpacity> */}
    </View>
  );
};
