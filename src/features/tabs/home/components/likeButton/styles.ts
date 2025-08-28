import { useTheme } from "@/src/hooks/useTheme";
import { StyleSheet } from "react-native";

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    mainContainer: {
      backgroundColor: colors.background,
    },
  });
};
