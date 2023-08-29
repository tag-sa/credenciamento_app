import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function LayoutAuth() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "transparent" },
      }}
    />
  );
}
