import { StyleSheet } from "react-native";

import { scaleSize } from "@/src/functions/scaleSize";
import { theme } from "@/src/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleSize(32),
    backgroundColor: theme.colors.light,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleSize(16),
    marginBottom: scaleSize(24),
  },
  vStack: {
    flex: 1,
    gap: scaleSize(8),
    flexDirection: "column",
  },
  hStack: {
    flex: 1,
    gap: scaleSize(16),
    flexDirection: "row",
  },
  headerTitle: {
    gap: scaleSize(8),
    flexDirection: "row",
    alignItems: "center",
  },
});
