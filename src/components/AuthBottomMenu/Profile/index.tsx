import { View, Image, Text } from "react-native";
import { menuItemStyle } from "../styles";

interface MenuItemProps {
  focused: boolean;
}

export default function ProfileItem({ focused }: MenuItemProps) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {focused && (
        <Image
          source={require("assets/images/icons/icon-profile-active.png")}
        />
      )}
      {!focused && (
        <Image source={require("assets/images/icons/icon-profile.png")} />
      )}

      <Text
        style={[menuItemStyle.label, focused ? menuItemStyle.activeLabel : {}]}
      >
        Perfil
      </Text>
    </View>
  );
}
