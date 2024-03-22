import React from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity } from "react-native";

import { Text } from "./text";

import { scaleSize } from "@/src/functions/scaleSize";
import { theme } from "@/src/theme";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warn"
  | "info"
  | "outline"
  | "ghost"
  | "link";

type ButtonVariantStyle = {
  background: string;
  text: string;
  borderColor?: string;
  borderWidth?: number;
  textDecorationLine?: "none" | "underline" | "line-through" | "underline line-through";
};

interface ButtonProps {
  variant?: ButtonVariant;
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

const buttonVariants: Record<ButtonVariant, ButtonVariantStyle> = {
  primary: {
    background: theme.colors.primary.normal,
    text: theme.colors.light,
  },
  secondary: {
    background: theme.colors.secondary.normal,
    text: theme.colors.light,
  },
  // Adicione as outras variantes aqui
  success: {
    background: theme.colors.success,
    text: theme.colors.dark,
  },
  error: {
    background: theme.colors.error,
    text: theme.colors.light,
  },
  warn: {
    background: theme.colors.alert,
    text: theme.colors.dark,
  },
  info: {
    background: theme.colors.info,
    text: theme.colors.light,
  },
  outline: {
    background: "transparent",
    text: theme.colors.primary.normal,
    borderWidth: 1,
    borderColor: theme.colors.primary.normal,
  },
  ghost: {
    background: "transparent",
    text: theme.colors.dark,
  },
  link: {
    background: "transparent",
    text: theme.colors.primary.normal,
    textDecorationLine: "underline",
  },
};

export function Button({ variant = "primary", onPress, title }: ButtonProps) {
  const variantStyle = buttonVariants[variant] || buttonVariants.primary;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: variantStyle.background,
          borderColor: variantStyle.borderColor || "transparent",
          borderWidth: variantStyle.borderWidth || 0,
        },
      ]}
      onPress={onPress}>
      <Text
        type={"paragraph"}
        value={title}
        textStyle={[
          styles.buttonText,
          {
            color: variantStyle.text,
            textDecorationLine: variantStyle.textDecorationLine || "none",
          },
        ]}
      />
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  button: {
    padding: scaleSize(14),
    borderRadius: scaleSize(32),
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: scaleSize(14),
  },
});
