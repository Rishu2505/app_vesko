import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { Dimensions, StyleSheet } from "react-native";
const { height } = Dimensions.get("window");
const ITEM_MARGIN = h(8);

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    tabRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingTop: v(15),
    },
    tabText: {
      fontSize: m(14),
      fontFamily: fonts.PoppinsSemiBold,
      color: colors.text,
    },
    tabIndicator: {
      height: v(4),
      width: h(90),
      backgroundColor: colors.appWhite,
      marginTop: v(5),
      borderRadius: m(50),
      paddingHorizontal: h(10),
    },
    activeTabIndicator: {
      backgroundColor: colors.appSecondary,
    },
    chipList: {
      paddingHorizontal: h(16),
      paddingTop: v(15),
    },
    list: {
      flex: 1,
      paddingTop: v(15),
    },
    listContainer: {
      paddingBottom: v(100),
      paddingHorizontal: ITEM_MARGIN,
    },
    emptyUI: {
      flex: 1,
      height: height / 1.6,
      alignItems: "center",
      justifyContent: "center",
    },
    sorryAnimation: {
      height: v(100),
      width: h(100),
    },
    emptyText: {
      fontSize: m(13),
      fontFamily: fonts.SpaceMonoRegular,
      color: colors.appBlack,
      textAlign:'center'
    },
  });
};
