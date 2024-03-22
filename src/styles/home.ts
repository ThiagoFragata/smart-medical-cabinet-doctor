import { StyleSheet } from "react-native";

import { scaleSize } from "@/src/functions/scaleSize";
import { theme } from "@/src/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scaleSize(24),
    backgroundColor: theme.colors.light,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleSize(16),
    marginBottom: scaleSize(24),
  },
  itemList: {
    flexDirection: "row",
    backgroundColor: theme.colors.light,
    borderRadius: scaleSize(8),
    padding: scaleSize(16),

    shadowColor: theme.colors.dark,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  vStack: {
    flex: 1,
    gap: scaleSize(16),
  },
});
