import { View, Image, Text } from "react-native";
import { menuItemStyle } from "../styles";
import { IMAGES } from "../../../constants/Images";

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
      {focused && <IMAGES.MENU.ProfileActive />}
      {!focused && <IMAGES.MENU.Profile />}

      <Text
        style={[menuItemStyle.label, focused ? menuItemStyle.activeLabel : {}]}
      >
        Perfil
      </Text>
    </View>
  );
}
