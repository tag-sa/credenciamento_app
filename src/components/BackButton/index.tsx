import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { TouchableOpacity } from "react-native";
import { SvgProps } from "react-native-svg";
import { IMAGES } from "../../constants/Images";

interface BackButtonProps {
  Icon?: FC<SvgProps>;
  route?: string;
  routeParams?: any;
}

export const BackButton = ({ Icon = IMAGES.ICONS.BackButton, route, routeParams }: BackButtonProps) => {
  const navigation = useNavigation<any>();

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
