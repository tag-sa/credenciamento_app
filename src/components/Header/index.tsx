import {
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType,
} from "react-native";
import { IMAGES } from "../../constants/Images";
import { COLORS } from "../../constants/Colors";
import { PADDINGS } from "../../constants/Paddings";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

interface HeaderComponentProps {
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  backgroundColor?: string;
}
export const HeaderComponent = ({
  backgroundColor = COLORS.whiteColor,
  leftIcon = IMAGES.ICONS.HAMBURGER.uri,
  rightIcon = IMAGES.ICONS.TOP_PROFILE.uri,
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
        <Image source={leftIcon} />
      </TouchableOpacity>

      <Image source={rightIcon} />
    </View>
  );
};
