import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

interface ButtonProps {
  buttonEnabled: boolean;
  onPress: () => void;
  label: string;
}

export default function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        backgroundColor: props.buttonEnabled
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
        if (props.buttonEnabled) {
          props.onPress();
        }
      }}
    >
      <Text style={styles.signInButton}>{props.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  signInButton: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1.2,
  },
});
