import { UserInfo } from "@/src/types/productPost";
import { BlurView } from "expo-blur";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, { FadeInDown, FadeInRight, LinearTransition } from "react-native-reanimated";
import { strings } from "./constants";
import { useThemedStyles } from "./styles";

type Props = {
  item: UserInfo;
  index: number;
};

export default function PeopleCard({
  item,
  index
}: Props) {
  const styles = useThemedStyles();
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 200).duration(800)}
      layout={LinearTransition.springify().damping(18).stiffness(160)}>
      <View style={styles.linearGradient}>
        <View style={styles.card}>
          <View style={styles.avatarContainer}>
            <BlurView intensity={50} tint="light" style={[StyleSheet.absoluteFill, styles.blurContainer]}>
              <Image source={{ uri: item.avatar }} resizeMode="cover" style={styles.avatar} />
            </BlurView>
          </View>
          <View>
            <Animated.Text entering={FadeInRight.delay(index * 200).duration(800)} numberOfLines={1} style={styles.name}>
              {item.name}
              {/* {item.verified && "✅"} */}
            </Animated.Text>
            <Animated.Text entering={FadeInRight.delay(index * 200).duration(800)} numberOfLines={1} style={styles.location}>{item.location}</Animated.Text>
            <Animated.Text entering={FadeInRight.delay(index * 200).duration(800)} numberOfLines={1} style={styles.followers}>{`${item.followers}${strings.followers}`}</Animated.Text>
          </View>

        </View>
      </View>
    </Animated.View>
  );
}
