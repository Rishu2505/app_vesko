import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { StyleSheet } from "react-native";

export const useThemedStyles =()=>{
  const colors = useTheme();
  return StyleSheet.create({
  topBar: {
    paddingHorizontal: h(16),
    paddingVertical: v(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.text_invert,
  },
  brand: {
    fontSize: m(22),
    fontFamily: fonts.PoppinsSemiBold,
    letterSpacing: 0.8,
    color: colors.appPrimary,
    textTransform: "uppercase",
  },
})
}
