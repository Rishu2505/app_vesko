import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { StyleSheet } from "react-native";

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    wrapper: {
      alignItems: "center",
      paddingHorizontal: h(16)
    },
    container: {
      flexDirection: "row",
      backgroundColor: colors.background,
      paddingLeft: h(12),
      paddingRight: h(14),
      height: v(45),
      borderRadius: m(8),
      alignItems: "center",
      borderColor: colors.appDarkGrey,
      borderWidth: v(1.3),
    },
    input: {
      flex: 1,
      fontSize: m(16),
      color: colors.text,
      fontFamily: fonts.PoppinsRegular,
      paddingLeft: h(10),
    },
  });
};
