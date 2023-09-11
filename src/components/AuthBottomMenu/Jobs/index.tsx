import { View, Text, Image } from "react-native";
import { menuItemStyle } from "../styles";

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
      {focused && (
        <Image
          source={require("../../../../assets/images/icons/icon-jobs-active.png")}
        />
      )}
      {!focused && (
        <Image
          source={require("../../../../assets/images/icons/icon-jobs.png")}
        />
      )}

      <Text
        style={[menuItemStyle.label, focused ? menuItemStyle.activeLabel : {}]}
      >
        Vagas
      </Text>
    </View>
  );
}
