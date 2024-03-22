import Stack from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import { Platform, View } from "react-native";

import { Text } from "@/src/components/atoms/text";
import { theme } from "@/src/theme";

export default function Modal() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: theme.colors.light,
      }}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "dark"} backgroundColor={"#fff"} />
      <Stack.Screen
        options={{
          headerTitle: "Editar Remédio",
          headerTitleAlign: "center",
          headerBackTitle: "Voltar",
          headerBackVisible: true,
          headerBackTitleVisible: true,
          animation: "slide_from_right",
        }}
      />
      <Text type={"title"} value={"teste"} />
    </View>
  );
}
