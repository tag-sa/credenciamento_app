import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/Colors";

interface ButtonProps {
  buttonEnabled?: boolean;
  onPress: () => void;
  label: string;
}

export default function Button({
  label,
  onPress,
  buttonEnabled = true,
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        backgroundColor: buttonEnabled
          ? COLORS.blueColor
          : COLORS.lightBlueColor,
        borderRadius: 10,
        height: 50,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        width: 250,
        alignSelf: "center",
      }}
      onPress={() => {
        if (buttonEnabled) {
          onPress();
        }
      }}
    >
      <Text style={styles.signInButton}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  signInButton: {
    color: COLORS.whiteColor,
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1.2,
  },
});
