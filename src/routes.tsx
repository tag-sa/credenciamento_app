import { NavigationContainer } from "@react-navigation/native";
import { MyStack } from "./navigation/Stack";

export const Router = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};
