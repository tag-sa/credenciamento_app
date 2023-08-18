import { View, Text, TextInput, KeyboardTypeOptions } from "react-native";
import { styles } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { COLORS } from "../../../constants";

interface InputProps {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  marginTop?: number;
  icons?: Array<any>;
  iconColor?: string;
  iconSize?: number;
  obscureText?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  error?: boolean;
}

export default function CustomInputWithTextAndIcon(props: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={{
        ...styles.input,
        marginTop: props.marginTop,
        borderColor: props.error ? COLORS.dangerColor : COLORS.grayColor,
      }}
    >
      <Text style={styles.label}>{props.label}</Text>
      <View>
        <TextInput
          autoCapitalize={props.autoCapitalize}
          style={styles.inputText}
          onChangeText={props.onChangeText}
          value={props.value}
          placeholder={props.placeholder}
          secureTextEntry={props.obscureText && !showPassword}
          keyboardType={props.keyboardType}
        />

        {props.icons && (
          <Ionicons
            name={!showPassword ? props.icons[0] : props.icons[1]}
            onPress={() => setShowPassword(!showPassword)}
            size={props.iconSize}
            style={{ position: "absolute", right: 10 }}
            color={props.iconColor}
          />
        )}
      </View>
    </View>
  );
}
