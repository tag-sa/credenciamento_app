import { useNavigation } from "@react-navigation/native";
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from "react-native";
import { IMAGES } from "../../constants/Images";

interface BackButtonProps {
  icon?: ImageSourcePropType;
}

export const BackButton = ({
  icon = IMAGES.ICONS.BACK_BUTTON.uri,
}: BackButtonProps) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={() => {
        if (navigation.canGoBack()) navigation.goBack();
      }}
    >
      <Image source={icon} />
    </TouchableOpacity>
  );
};
