import {
  View,
  Text,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { COLORS } from "../../../constants";
import { MaskedTextInput } from "react-native-mask-text";

interface InputProps {
  label: string;
  value?: string;
  placeholder?: string;
  onChangeText: (text: string, rawText?: string) => void;
  onInputPress?: (clicked: boolean) => void;
  marginTop?: number;
  marginBottom?: number;
  icons?: Array<any>;
  iconColor?: string;
  iconSize?: number;
  obscureText?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  error?: boolean;
  textColor?: string;
  textWeight?: "normal" | "bold";
  mask?: string;
  erroMessage?: string;
  addrRef?: any;
}

export default function CustomInputWithTextAndIcon(props: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <View
        style={{
          ...styles.input,
          marginTop: props.marginTop,
          marginBottom: props.marginBottom,
          borderColor: props.error ? COLORS.dangerColor : COLORS.grayColor,
          ...(!props.error && isFocused && styles.inputFocused),
        }}
      >
        <Text
          style={
            (isFocused ? styles.labelFocused : styles.label,
            {
              fontWeight: props.textWeight || "bold",
              color: props.textColor || COLORS.grayColor,
            })
          }
        >
          {props.label}
        </Text>
        <View>
          {props.mask && (
            <MaskedTextInput
              ref={props.addrRef}
              autoCapitalize={props.autoCapitalize}
              onFocus={() => {
                setIsFocused(true);
                props.onInputPress && props.onInputPress(true);
              }}
              onBlur={() => {
                setIsFocused(false);
              }}
              style={{
                ...styles.inputText,
                color: props.textColor || COLORS.grayColor,
                fontWeight: props.textWeight || "normal",
              }}
              mask={props.mask}
              onChangeText={(text, rawText) => {
                props.onChangeText(text, rawText);
              }}
              value={props.value}
              placeholder={props.placeholder}
              secureTextEntry={props.obscureText && !showPassword}
              keyboardType={props.keyboardType}
            />
          )}

          {!props.mask && (
            <TextInput
              ref={props.addrRef}
              autoCapitalize={props.autoCapitalize}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
              }}
              style={{
                ...styles.inputText,
                color: props.textColor || COLORS.grayColor,
                fontWeight: props.textWeight || "normal",
              }}
              onChangeText={(text) => {
                props.onChangeText(text, text);
              }}
              value={props.value}
              placeholder={props.placeholder}
              secureTextEntry={props.obscureText && !showPassword}
              keyboardType={props.keyboardType}
            />
          )}

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
      {props.error && <Text style={styles.invalid}>{props.erroMessage}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: COLORS.grayColor,
    borderRadius: 7,
  },
  inputFocused: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: COLORS.blueColor,
    borderRadius: 7,
    backgroundColor: COLORS.lightBlueColor,
  },
  label: {
    color: COLORS.lightGrayColor,
    fontWeight: "500",
  },
  labelFocused: {
    color: COLORS.blueColor,
    fontWeight: "bold",
  },
  inputText: {
    color: COLORS.grayColor,
    marginTop: 10,
    fontWeight: "bold",
  },
  invalid: {
    marginTop: 3,
    marginLeft: 2,
    color: COLORS.dangerColor,
    fontSize: 10,
  },
});
