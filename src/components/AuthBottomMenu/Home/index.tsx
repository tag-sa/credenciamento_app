import { View, Text, Image } from "react-native";
import { menuItemStyle } from "../styles";

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
      {focused && (
        <Image
          source={require("../../../../assets/images/icons/icon-home-active.png")}
        />
      )}
      {!focused && (
        <Image
          source={require("../../../../assets/images/icons/icon-home.png")}
        />
      )}

      <Text
        style={[menuItemStyle.label, focused ? menuItemStyle.activeLabel : {}]}
      >
        Home
      </Text>
    </View>
  );
}
