import { View, Text } from "react-native";
import { menuItemStyle } from "../styles";
import { IMAGES } from "../../../constants/Images";

interface MenuItemProps {
  focused: boolean;
}

export default function HomeItem({ focused }: MenuItemProps) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {focused && <IMAGES.MENU.HomeActive />}
      {!focused && <IMAGES.MENU.Home />}

      <Text
        style={[menuItemStyle.label, focused ? menuItemStyle.activeLabel : {}]}
      >
        Home
      </Text>
    </View>
  );
}
