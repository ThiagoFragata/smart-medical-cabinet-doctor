import {
  StyleProp,
  StyleSheet,
  Text as TextNative,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { scaleSize } from "@/src/functions/scaleSize";
import { theme } from "@/src/theme";

type textType = keyof typeof text;
const text = {
  heading: (value: string | number, style?: StyleProp<TextStyle>) => (
    <TextNative style={[styles.heading, style]}>{value}</TextNative>
  ),
  title: (value: string | number, style?: StyleProp<TextStyle>) => (
    <TextNative style={[styles.title, style]}>{value}</TextNative>
  ),
  subtitle: (value: string | number, style?: StyleProp<TextStyle>) => (
    <TextNative style={[styles.subtitle, style]}>{value}</TextNative>
  ),
  paragraph: (value: string | number, style?: StyleProp<TextStyle>) => (
    <TextNative style={[styles.paragraph, style]}>{value}</TextNative>
  ),
  default: (value: string | number, style?: StyleProp<TextStyle>) => (
    <TextNative style={[styles.default, style]}>{value}</TextNative>
  ),
};

interface HeadingProps {
  type: textType;
  value: string | number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Text({ type, value, style, textStyle, ...props }: HeadingProps) {
  return (
    <View style={style} {...props}>
      {text[type](value, textStyle)}
    </View>
  );
}

export const styles = StyleSheet.create({
  title: {
    color: theme.colors.dark,
    fontSize: scaleSize(24),
    fontWeight: "700",
  },
  subtitle: {
    color: theme.colors.dark,
    fontSize: scaleSize(16),
    fontWeight: "600",
  },
  heading: {
    color: theme.colors.dark,
    fontSize: scaleSize(18),
    fontWeight: "500",
  },
  paragraph: {
    color: theme.colors.dark,
    fontSize: scaleSize(16),
    fontWeight: "400",
  },
  default: {
    color: theme.colors.dark,
    fontSize: scaleSize(14),
    fontWeight: "400",
  },
});
