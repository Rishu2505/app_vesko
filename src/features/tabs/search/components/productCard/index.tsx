import { useTheme } from "@/src/hooks/useTheme";
import { ProductInfo } from "@/src/types/productPost";
import { ImageBackground } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import Animated, { FadeInDown, FadeInLeft, FadeInRight, LinearTransition } from "react-native-reanimated";
import { useThemedStyles } from "./styles";

type Props = {
  item: ProductInfo;
  index: number;
};

export default function ProductCard({
  item,
  index,
}: Props) {
  const redTags = ['Sale', 'Last Call', 'Limited']
  const primaryTags = ['Luxury', 'Trending', 'Hot']
  const styles = useThemedStyles();
  const colors = useTheme();
  const tagColor = redTags.includes(item.tag || '') ? colors.appRed : primaryTags.includes(item.tag || '') ? colors.appPrimary : colors.appSecondary;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 200).duration(800)}
      layout={LinearTransition.springify().damping(18).stiffness(160)}>
      <View style={styles.card}>

        <View style={styles.imageContainer}>
          <ImageBackground source={{ uri: item.image }} style={styles.image} />
          {item.tag && <Animated.Text entering={FadeInRight.delay(index * 200).duration(800)} style={[styles.tag, { backgroundColor: tagColor }]}>{item.tag}</Animated.Text>}
        </View>

        <View style={styles.titleContainer}>
          <Animated.Text entering={FadeInLeft.delay(index * 200).duration(800)} numberOfLines={1} style={styles.title}>{item.title}</Animated.Text>
        </View>
        <View style={styles.brandAndCategoryRowContainer}>
          <Animated.Text entering={FadeInLeft.delay(index * 200).duration(800)} numberOfLines={1} style={styles.brand}>{item.brand}</Animated.Text>
          <View style={styles.categoryRow}>
            <Animated.Text entering={FadeInLeft.delay(index * 200).duration(800)} numberOfLines={1} style={styles.category}>{item.category}</Animated.Text>
            <View style={styles.priceRow}>
              {item.oldPrice && <Text numberOfLines={1} style={styles.oldPrice}>{item.oldPrice}</Text>}
              <Animated.Text entering={FadeInRight.delay(index * 200).duration(800)} numberOfLines={1} style={styles.price}>{item.price}</Animated.Text>
            </View>
          </View>
        </View>

      </View>
    </Animated.View>
  );
}
