import { StoreInfo } from "@/src/types/productPost";
import { BlurView } from "expo-blur";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, { FadeInDown, FadeInRight, LinearTransition } from "react-native-reanimated";
import { strings } from "./constants";
import { useThemedStyles } from "./styles";

type Props = {
  item: StoreInfo;
  index: number;
};

export default function StoreCard({
  item, index
}: Props) {
  const styles = useThemedStyles();
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 200).duration(800)}
      layout={LinearTransition.springify().damping(18).stiffness(160)}>
      <View style={styles.card}>

        <View style={styles.logoContainer}>
          <BlurView intensity={50} tint="light" style={[StyleSheet.absoluteFill, styles.blurContainer]}>
            <Image source={{ uri: item.logo }} resizeMode="cover" style={styles.logo} />
          </BlurView>
        </View>

        <View>
          <Animated.Text entering={FadeInRight.delay(index * 200).duration(800)} style={styles.name}>{item.name}</Animated.Text>
          <Animated.Text entering={FadeInRight.delay(index * 200).duration(800)} style={styles.location}>{item.location}</Animated.Text>
          <Animated.Text entering={FadeInRight.delay(index * 200).duration(800)} style={styles.details}>⭐ {item.rating} | {item.followers}{strings.followers}</Animated.Text>
        </View>
      </View>
    </Animated.View>
  );
}
