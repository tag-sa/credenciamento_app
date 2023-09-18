import { TouchableOpacity, View } from "react-native";
import { IMAGES } from "../../constants/Images";
import { COLORS } from "../../constants/Colors";
import { PADDINGS } from "../../constants/Paddings";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { SvgProps } from "react-native-svg";
import { FC } from "react";

interface HeaderComponentProps {
  LeftIcon?: FC<SvgProps>;
  RightIcon?: FC<SvgProps>;
  backgroundColor?: string;
}
export const HeaderComponent = ({
  backgroundColor = COLORS.whiteColor,
  LeftIcon = IMAGES.ICONS.Hamburguer,
  RightIcon = IMAGES.ICONS.TopProfile,
}: HeaderComponentProps) => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: backgroundColor,
        paddingHorizontal: PADDINGS.horizontal,
        paddingTop: top,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}
      >
        <LeftIcon />
      </TouchableOpacity>

      <RightIcon />
    </View>
  );
};
