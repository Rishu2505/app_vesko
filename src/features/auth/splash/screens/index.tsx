import { IMAGES } from '@/src/assets';
import { useTheme } from '@/src/hooks/useTheme';
import { Marquee } from '@animatereactnative/marquee';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import Animated, { FadeInLeft, FadeInRight, ZoomInDown } from 'react-native-reanimated';
import { product_images } from './constants';
import { useThemedStyles } from './styles';

const _spacing = 8;
const _initialDelay = 200;
const _duration = 500;

function chunkArray(array: string[], size: number) {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
}

export function Splash() {
  const styles = useThemedStyles();
  const colors = useTheme();

  const images = useMemo(
    () => chunkArray(product_images, Math.floor(product_images.length / 4)),
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tabs)/home");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);



  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainView}>
        <View style={styles.secondaryView}>
          <View
            style={styles.innerView}>
            {images.map((column, columnIndex) => (
              <Marquee
                speed={0.3}
                spacing={_spacing}
                withGesture={false}
                frameRate={120}
                key={`marquee-${columnIndex}`}
                reverse={columnIndex % 2 !== 0}>
                <View style={{ flexDirection: "row", gap: _spacing }}>
                  {column.map((image, index) => (
                    <Animated.Image
                      key={`image-for-column-${columnIndex}-${index}`}
                      source={{ uri: image }}
                      entering={
                        columnIndex % 2 === 0
                          ? FadeInRight.duration(_duration).delay(
                            _initialDelay * (columnIndex + 1) +
                            Math.random() * 100
                          )
                          : FadeInLeft.duration(_duration).delay(
                            _initialDelay * (columnIndex + 1) +
                            Math.random() * 100
                          )
                      }
                      style={styles.image}
                    />
                  ))}
                </View>
              </Marquee>
            ))}
          </View>
          <Animated.View entering={ZoomInDown.duration(2000).springify().damping(12).stiffness(90)} style={styles.splashView}>
            <BlurView intensity={10} tint="light">
              <Animated.Image source={IMAGES.SPLASH} resizeMode='contain' style={styles.splash} />
            </BlurView>
          </Animated.View>
          <LinearGradient
            colors={["#00000000", colors.appPrimary, colors.appPrimary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0, 0.7, 1]}
            style={styles.linearGradient1}
            pointerEvents='none'
          />
          <LinearGradient
            colors={[colors.appPrimary, colors.appPrimary, "#00000000"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0, 0.3, 1]}
            style={styles.linearGradient2}
            pointerEvents='none'
          />
        </View>
      </View>
    </View>
  );
}
