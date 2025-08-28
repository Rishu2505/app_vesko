import { useTheme } from "@/src/hooks/useTheme";
import { h, m, v } from "@/src/utils/metrics";
import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
const _itemSize = width * 0.45;
const _spacing = 8;

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    splashView: {
      height: v(120),
      width: h(250),
      marginBottom: height / 2.5,
      paddingHorizontal: v(20),
      paddingVertical: v(10),
      borderRadius: m(9999),
      overflow: "hidden",
      backgroundColor: "rgba(255,255,255,0.6)",
    },
    splash: {
      height: "100%",
      width: "100%",
    },
    mainView: {
      flex: 1,
      backgroundColor: colors.appPrimary,
      overflow: "hidden",
      paddingBottom: v(10),
      justifyContent: "center",
      alignItems: "center",
    },
    secondaryView: { flex: 1, overflow: "hidden", alignItems: "center" },
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
    linearGradient1: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: "10%",
    },
    linearGradient2: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: "15%",
    },
  });
};
