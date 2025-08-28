import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { StyleSheet } from "react-native";

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      padding: v(12),
      marginBottom: v(12),
      marginHorizontal: v(8),
      borderRadius: m(8),
      backgroundColor: "#f4f4f4",
    },
    logoContainer: {
      width: h(50),
      height: v(50),
      marginRight: h(12),
      borderRadius: m(8),
      overflow: "hidden",
      backgroundColor: colors.appSecondary,
    },
    blurContainer: { justifyContent: "center" },
    logo: {
      width: h(45),
      height: v(45),
      borderRadius: m(6),
      alignSelf: "center",
      backgroundColor: colors.appGrey,
    },
    name: {
      fontFamily: fonts.PoppinsSemiBold,
      fontSize: m(15),
      color: colors.text,
      textAlign: "left",
    },
    location: {
      fontFamily: fonts.PoppinsMedium,
      fontSize: m(13),
      color: colors.text,
      textAlign: "left",
    },
    details: {
      fontFamily: fonts.SpaceMonoRegular,
      fontSize: m(12),
      color: colors.text,
      textAlign: "left",
    },
  });
};
