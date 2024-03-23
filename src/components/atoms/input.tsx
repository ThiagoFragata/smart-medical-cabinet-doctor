import React, { useRef, useState } from "react";
import {
  Animated,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextInputProps,
  View,
} from "react-native";

import { scaleSize } from "@/src/functions/scaleSize";
import { theme } from "@/src/theme";

interface InputComponentProps extends TextInputProps {
  label: string;
  type?: "text" | "password";
  disabled?: boolean;
  invalid?: boolean;
  error?: string;
  isTouched?: boolean;
}

export function InputComponent({
  label,
  error,
  type = "text",
  invalid = false,
  disabled = false,
  isTouched,
  ...props
}: InputComponentProps) {
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<TextInput>(null);
  const labelAnimation = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    Animated.timing(labelAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (!inputValue) {
      Animated.timing(labelAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setInputValue(event.nativeEvent.text);
  };

  const handleLabelPress = () => {
    inputRef.current?.focus();
  };

  const labelTranslateY = labelAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, scaleSize(-28)],
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={handleLabelPress}>
        <Animated.Text style={[styles.label, { transform: [{ translateY: labelTranslateY }] }]}>
          {label}
        </Animated.Text>
      </Pressable>
      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          {
            borderColor: invalid ? theme.colors.error : theme.colors.dark,
          },
        ]}
        editable={!disabled}
        secureTextEntry={type === "password"}
        onFocus={handleFocus}
        onEndEditing={handleBlur}
        onChange={handleChange}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scaleSize(16),
    position: "relative",
  },
  label: {
    backgroundColor: theme.colors.light,
    position: "absolute",
    left: scaleSize(20),
    top: scaleSize(16),
    fontSize: scaleSize(16),
    color: theme.colors.dark,
  },
  input: {
    zIndex: -1,
    borderWidth: scaleSize(1),
    borderRadius: scaleSize(32),
    borderColor: theme.colors.dark,
    paddingVertical: scaleSize(14),
    paddingHorizontal: scaleSize(16),
    fontSize: scaleSize(16),
    backgroundColor: theme.colors.light,
  },
  error: {
    marginTop: scaleSize(5),
    fontSize: scaleSize(14),
    color: theme.colors.error,
  },
});
