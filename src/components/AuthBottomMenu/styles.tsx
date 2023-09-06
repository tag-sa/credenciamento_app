import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/Colors";

export const menuItemStyle = StyleSheet.create({
  label: {
    color: COLORS.secBlueColor,
    marginTop: 5,
    fontWeight: "600",
  },
  activeLabel: {
    color: COLORS.primaryColor,
    fontWeight: "900",
  },
});
