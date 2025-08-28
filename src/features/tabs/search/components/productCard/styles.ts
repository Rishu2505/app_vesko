import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");
const H_PADDING = h(8);
const CARD_MARGIN = h(8);
const NUM_COLUMNS = 2;

const ITEM_WIDTH =
  (width - H_PADDING * 2 - CARD_MARGIN * 2 * NUM_COLUMNS) / NUM_COLUMNS;

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    card: {
      width: ITEM_WIDTH,
      marginHorizontal: CARD_MARGIN,
      backgroundColor: colors.background,
      alignSelf: "center",
      marginBottom: v(15)
    },
    imageContainer: {
      flex: 1,
      height: v(200),
      borderRadius: m(8),
      overflow: "hidden",
      backgroundColor: colors.appGrey,
    },
    image: {
      flex: 1,
    },
    tag: {
      position: "absolute",
      top: v(0),
      right: h(0),
      backgroundColor: colors.appSecondary,
      color: colors.text_invert,
      paddingHorizontal: h(8),
      paddingVertical: v(2),
      borderBottomLeftRadius: m(6),
      fontSize: m(11),
      fontFamily: fonts.PoppinsMedium,
      textAlign: "center",
    },
    titleContainer:{
      //maxHeight: v(50),
    },
    title: {
      fontFamily: fonts.PoppinsSemiBold,
      marginTop: v(6),
      fontSize: m(14),
      color: colors.text,
      textAlign: "left",
    },
    brandAndCategoryRowContainer:{

    },
    brand: {
      fontSize: m(13),
      marginVertical: v(5),
      color: colors.text,
      fontFamily: fonts.PoppinsSemiBold,
      textAlign: "left",
    },
    categoryRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    category: {
      fontSize: m(12),
      color: colors.appDarkGrey,
      fontFamily: fonts.PoppinsMedium,
      textAlign: "left",
      textAlignVertical: "center",
    },
    priceRow: { flexDirection: "row", alignItems: "center" },
    oldPrice: {
      textDecorationLine: "line-through",
      color: colors.appRed,
      marginRight: h(8),
      fontSize: m(10),
      textAlign: "left",
      fontFamily: fonts.PoppinsMedium,
    },
    price: {
      color: colors.appSecondary,
      fontFamily: fonts.PoppinsSemiBold,
      fontSize: m(13),
      textAlign: "left",
    },
  });
};
