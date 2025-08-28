import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");
const _itemSize = width * 0.45;
const _spacing = 8;

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.appPrimary,
    },
    scrollView: {
      flex: 1,
      marginBottom: v(50),
    },
    mainView: {
      flex: 1,
      backgroundColor: colors.appPrimary,
      overflow: "hidden",
      paddingBottom: v(100),
    },
    secondaryView: { flex: 1, overflow: "hidden" },
    innerView: {
      flex: 1,
      gap: _spacing,
      transform: [
        {
          rotate: "-4deg",
        },
      ],
    },
    image: {
      width: _itemSize,
      aspectRatio: 1,
      borderRadius: _spacing,
    },
    contentView: {
      flex: 0.5,
      marginTop: -50,
      alignItems: "center",
      paddingHorizontal: _spacing,
      gap: _spacing,
    },
    linearGradient1: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: "30%",
    },
    linearGradient2: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: "15%",
    },
    avatarContainer: {
      width: h(80),
      height: v(80),
      borderRadius: m(40),
      overflow: "hidden",
      backgroundColor: colors.appWhite
    },
    blurContainer: { justifyContent: "center" },
    avatar: {
      width: h(74),
      height: v(74),
      borderRadius: m(40),
      alignSelf: "center",
      backgroundColor: colors.appGrey,
    },
    title: {
      color: colors.appWhite,
      fontFamily: fonts.SpaceMonoRegular,
      fontSize: m(28),
      textAlign: "center",
    },
    sub_title: {
      color: colors.appWhite,
      textAlign: "justify",
      paddingHorizontal: _spacing,
      fontFamily: fonts.SpaceMonoRegular,
    },
  });
};
