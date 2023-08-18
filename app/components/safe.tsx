import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const SafeAreaWrapper = ({ children }) => (
  <SafeAreaProvider style={styles.container}>{children}</SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SafeAreaWrapper;
