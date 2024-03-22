import { Stack } from "expo-router/stack";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { theme } from "@/src/theme";

export default function Layout() {
  const { top } = useSafeAreaInsets();

  return (
    <>
      <View style={{ paddingTop: top, backgroundColor: theme.colors.light }} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
