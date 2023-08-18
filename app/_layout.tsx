import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      {/* <Stack.Screen name="index" /> */}
      {/* <Stack.Screen name="memories" />
          <Stack.Screen name="new" /> */}
    </Stack>
  );
}
