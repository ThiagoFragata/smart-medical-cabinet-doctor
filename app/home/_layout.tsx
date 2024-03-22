import { Stack } from "expo-router/stack";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { theme } from "@/src/theme";

export default function Layout() {
  const { top } = useSafeAreaInsets();

  return (
    <>
      <View style={{ paddingTop: top, backgroundColor: theme.colors.light }} />

      <Stack
        initialRouteName="modal"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="medicaments"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="modal"
          options={{
            headerShown: Platform.OS !== "ios",
            presentation: "modal",
          }}
        />
      </Stack>
    </>
  );
}
