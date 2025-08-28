import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { StyleSheet } from "react-native";

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    storeDescContainer: {
      paddingHorizontal: h(16),
      paddingTop: v(12),
      paddingBottom: v(18),
    },
    storeDesc: {
      fontSize: m(13),
      color: colors.text,
      fontFamily: fonts.PoppinsRegular,
      textAlign: "left",
    },
    bold: {
      fontFamily: fonts.PoppinsSemiBold,
    },
    more: {
      fontFamily: fonts.PoppinsRegular,
      color: colors.appGrey,
      marginBottom: h(-5),
      fontSize: m(13),
    },
  });
};
