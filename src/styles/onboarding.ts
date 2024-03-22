import { StyleSheet } from "react-native";

import { scaleSize } from "@/src/functions/scaleSize";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scaleSize(32),
  },
  content: {
    width: "100%",
    gap: scaleSize(16),
  },
});
