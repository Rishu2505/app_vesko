import { useTheme } from "@/src/hooks/useTheme";
import { Feather, FontAwesome } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

type Props = {
  isLiked: boolean;
  onLike: () => void;
  size?: number;
};

export default function LikeButton({ isLiked, onLike, size = 20 }: Props) {
  //const styles = useThemedStyles();
  const colors = useTheme();
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (isLiked) {
      // translateY + zoom animation
      scale.value = withTiming(1.5, { duration: 250 }, () => {
        scale.value = withTiming(1);
      });
      translateY.value = withTiming(-50, { duration: 250 }, () => {
        translateY.value = withTiming(0);
      });
    } else {
      // reset smoothly
      scale.value = withTiming(1.1, { duration: 150 }, () => {
        scale.value = withTiming(1);
      });
    }
  }, [isLiked, scale, translateY,]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value }
    ],
  }));

  return (
    <TouchableOpacity onPress={onLike} activeOpacity={0.7}>
      <Animated.View style={animatedStyle}>
        {isLiked ? (
          <FontAwesome name="heart" size={size} color={colors.appRed} />
        ) : (
          <Feather name="heart" size={size} color={colors.text_invert} />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}
