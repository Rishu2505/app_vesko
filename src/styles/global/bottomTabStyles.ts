import { useTheme } from "@/src/hooks/useTheme";
import { h, m, v } from "@/src/utils/metrics";
import { StyleSheet } from "react-native";
export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    tabBar: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: v(85),
      backgroundColor: colors.background,
      borderTopWidth: v(1),
      borderTopColor: colors.background,
      shadowColor: colors.appBlack,
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: v(5) },
      shadowRadius: m(10),
      elevation: 5,
      paddingTop: 0,
      paddingHorizontal: h(15),
    },
    tabBarItemStyle: {
      height: "100%",
      paddingTop: v(0),
    },
    tabIconContainer: {
      flex: 1,
      height: v(85),
      justifyContent: "center",
      alignItems: "center",
    },
    inactiveTab: {
      width: h(50),
      borderTopWidth: h(5),
      borderBottomLeftRadius: m(20),
      borderBottomRightRadius: m(20),
      borderTopColor: colors.appWhite,
      marginBottom: v(8),
    },
    activeTab: {
      borderTopColor: colors.appSecondary,
    },
  });
};
