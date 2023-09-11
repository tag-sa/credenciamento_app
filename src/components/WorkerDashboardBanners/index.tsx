import { Image, Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../constants/Colors";

interface WorkerDashboardBannersProps {
  backgroundColor: string;
  iconImage: any;
  marginLeft?: number;
  marginRight?: number;
  text: string;
  color?: string;
  reverse?: boolean;
}

export const WorkerDashboardBannersComponent = ({
  backgroundColor,
  iconImage,
  marginLeft,
  marginRight,
  text,
  color = COLORS.primaryColor,
  reverse,
}: WorkerDashboardBannersProps) => {
  return (
    <View
      style={{
        backgroundColor,
        marginLeft,
        marginRight,

        ...(!reverse ? style.container : style.containerReverse),
      }}
    >
      <Text style={{ color, ...style.text }}>{text}</Text>
      <Image
        source={iconImage}
        style={{
          marginRight: reverse ? 10 : 0,
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingLeft: 15,
    width: 200,
    height: 142,
    flexDirection: "row",
    borderTopLeftRadius: 30,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  containerReverse: {
    width: 200,
    height: 142,
    flexDirection: "row-reverse",
    borderTopLeftRadius: 30,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    width: 90,
    fontSize: 10,
    fontWeight: "bold",
  },
});
