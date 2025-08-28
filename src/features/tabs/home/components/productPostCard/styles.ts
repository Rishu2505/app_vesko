import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { StyleSheet } from "react-native";

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    card: {
      backgroundColor: colors.background,
      height: v(490),
    },
    innerView: {
      flex: 1,
      justifyContent: "space-between",
    },
    shadowBottom: {
      shadowColor: colors.appBlack,
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: v(5) },
      shadowRadius: m(10),
      elevation: v(5),
    },
    shadowTop: {
      shadowColor: colors.appBlack,
      shadowOpacity: 0.1,
      shadowOffset: { width: v(5), height: v(0) },
      shadowRadius: m(10),
      elevation: v(5),
    },
    userInfo: {
      flexDirection: "row",
      justifyContent: "center",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: h(16),
      paddingVertical: v(10),
      justifyContent: "space-between",
    },
    avatarCircle: {
      width: h(36),
      height: v(36),
      borderRadius: m(18),
      marginRight: h(8),
      overflow: "hidden",
    },
    avatar: {
      width: h(31),
      height: v(31),
      borderRadius: m(16),
      backgroundColor: colors.appGrey,
      alignSelf: "center",
    },
    username: {
      fontSize: m(13),
      color: colors.text_invert,
      fontFamily: fonts.PoppinsSemiBold,
    },
    locationText: {
      fontSize: m(11),
      color: colors.text_invert,
      fontFamily: fonts.PoppinsRegular,
    },
    actionButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: h(16),
      paddingVertical: v(14),
    },
    actions: {
      flexDirection: "row",
    },
    actionItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    actionItemSave: {
      flexDirection: "row",
      alignItems: "center",
    },
    actionText: {
      marginHorizontal: h(6),
      fontSize: m(13),
      color: colors.text_invert,
      fontFamily: fonts.PoppinsMedium,
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: h(16),
      paddingTop: v(8),
    },
    flex: {
      flex: 1,
    },
    row: {
      flexDirection: "row",
    },
    productTitle: {
      fontSize: m(15),
      fontFamily: fonts.PoppinsSemiBold,
      color: colors.text,
    },
    category: {
      color: colors.text,
      fontSize: m(13),
      fontFamily: fonts.PoppinsMedium,
    },
    buyBtn: {
      backgroundColor: colors.appSecondary,
      paddingVertical: v(6),
      paddingHorizontal: h(14),
      borderRadius: m(6),
    },
    buyBtnText: {
      color: colors.text_invert,
      fontSize: m(13),
      fontFamily: fonts.PoppinsSemiBold,
    },
    priceRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: h(20),
    },
    oldPrice: {
      textDecorationLine: "line-through",
      color: colors.appRed,
      marginRight: h(8),
      fontSize: m(9),
      fontFamily: fonts.PoppinsMedium,
    },
    newPrice: {
      color: colors.appSecondary,
      fontFamily: fonts.PoppinsSemiBold,
      fontSize: m(13),
    },
  });
};
