import { View, Text, Image } from "react-native";
import { menuItemStyle } from "../styles";

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
      {focused && (
        <Image
          source={require("../../../../assets/images/icons/icon-advertiser-bullhorn-active.png")}
        />
      )}
      {!focused && (
        <Image
          source={require("../../../../assets/images/icons/icon-advertiser-bullhorn.png")}
        />
      )}

      <Text
        style={[menuItemStyle.label, focused ? menuItemStyle.activeLabel : {}]}
      >
        Anunciante
      </Text>
    </View>
  );
}
