import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import FlashMessage from "react-native-flash-message";
import { auth } from "./services/auth";

export default function Layout() {
  // const [isLogged, setIsLogged] = useState(false);

  // useEffect(() => {
  //   async function checkLogin() {
  //     const user = await auth().getUser();
  //     if (user) {
  //       setIsLogged(true);
  //     }
  //   }

  //   checkLogin();
  // });

  return (
    <>
      <FlashMessage position="top" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        {/* <Stack.Screen name="index" redirect={isLogged} />
        <Stack.Screen name="dashboard/index" /> */}
      </Stack>
    </>
  );
}
