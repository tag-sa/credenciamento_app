import { View, Text } from "react-native";
import { menuItemStyle } from "../styles";
import { IMAGES } from "../../../constants/Images";

interface MenuItemProps {
  focused: boolean;
}

export default function AdvertiserItem({ focused }: MenuItemProps) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {focused && <IMAGES.MENU.BullhornActive />}
      {!focused && <IMAGES.MENU.Bullhorn />}

      <Text
        style={[menuItemStyle.label, focused ? menuItemStyle.activeLabel : {}]}
      >
        Anunciante
      </Text>
    </View>
  );
}
