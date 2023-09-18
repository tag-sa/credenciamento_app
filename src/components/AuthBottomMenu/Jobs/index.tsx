import { View, Text } from "react-native";
import { menuItemStyle } from "../styles";
import { IMAGES } from "../../../constants/Images";

interface MenuItemProps {
  focused: boolean;
}

export default function JobsItem({ focused }: MenuItemProps) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {focused && <IMAGES.MENU.JobsActive />}
      {!focused && <IMAGES.MENU.Jobs />}

      <Text
        style={[menuItemStyle.label, focused ? menuItemStyle.activeLabel : {}]}
      >
        Vagas
      </Text>
    </View>
  );
}
