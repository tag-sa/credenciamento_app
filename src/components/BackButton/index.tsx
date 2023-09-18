import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { IMAGES } from "../../constants/Images";
import { SvgProps } from "react-native-svg";
import { FC } from "react";

interface BackButtonProps {
  Icon?: FC<SvgProps>;
  route?: string;
  routeParams?: any;
}

export const BackButton = ({
  Icon = IMAGES.ICONS.BackButton,
  route,
  routeParams,
}: BackButtonProps) => {
  const navigation = useNavigation<any>();

  console.log(route, routeParams);

  return (
    <TouchableOpacity
      onPress={() => {
        if (route) {
          navigation.navigate(route, routeParams);
        } else {
          if (navigation.canGoBack()) navigation.goBack();
        }
      }}
    >
      <Icon />
    </TouchableOpacity>
  );
};
