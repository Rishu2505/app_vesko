import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { StyleSheet } from "react-native";

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    linearGradient: {
      flexDirection: "row",
      alignItems: "center",
      padding: v(12),
      marginBottom: v(12),
      marginHorizontal: v(8),
      borderRadius: m(8),
      backgroundColor: "#f4f4f4",
      // shadowColor: colors.appBlack,
      // shadowOpacity: 0.05,
      // shadowOffset: { width: v(0), height: v(5) },
      // shadowRadius: m(10),
      // elevation: v(5),
    },
    card: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    avatarContainer: {
      width: h(50),
      height: v(50),
      marginRight: h(12),
      borderRadius: m(25),
      overflow: "hidden",
      backgroundColor: colors.appSecondary,
    },
    blurContainer: { justifyContent: "center" },
    avatar: {
      width: h(45),
      height: v(45),
      borderRadius: m(25),
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
    followers: {
      fontFamily: fonts.SpaceMonoRegular,
      fontSize: m(12),
      color: colors.text,
      textAlign: "left",
    },
  });
};
