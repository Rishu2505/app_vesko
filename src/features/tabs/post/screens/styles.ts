import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { StyleSheet } from "react-native";

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    inProgressUI: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: v(100),
    },
    animation: {
      height: v(150),
      width: h(150),
    },
    inProgress: {
      fontSize: m(18),
      fontFamily: fonts.SpaceMonoRegular,
      color: colors.appBlack,
      textAlign: "center",
    },
  });
};
