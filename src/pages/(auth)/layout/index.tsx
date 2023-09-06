import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AuthLayoutProps {
  children: React.ReactNode;
}
export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: top }}>
      <Text>HEADER</Text>
      {children}
      <Text>FOOTER</Text>
    </View>
  );
};
