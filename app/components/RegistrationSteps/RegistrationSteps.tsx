import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../constants";

interface StepsProps {
  totalSteps: number;
  currentStep: number;
}

export default function RegistrationSteps({
  currentStep,
  totalSteps,
}: StepsProps) {
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={{
            ...style.stepItem,
            ...getStepStyle(index, totalSteps, currentStep),
          }}
        />
      ))}
    </View>
  );
}

const getStepStyle = (
  index: number,
  totalSteps: number,
  currentStep: number
) => {
  let style = {};
  if (index === 0) {
    style = {
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    };
  } else if (index == Array.from({ length: totalSteps }).length - 1) {
    style = {
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    };
  } else {
    style = {
      marginHorizontal: 3,
    };
  }

  if (currentStep === index + 1 || index + 1 < currentStep) {
    style = {
      ...style,
      backgroundColor: COLORS.orangeColor,
    };
  }

  return style;
};

const style = StyleSheet.create({
  stepItem: {
    width: 20,
    height: 10,
    backgroundColor: COLORS.lightGrayColor,
  },
});
