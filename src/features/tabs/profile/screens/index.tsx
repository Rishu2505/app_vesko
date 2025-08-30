import { CustomHeader } from '@/src/components';
import { useApi } from '@/src/hooks';
import { useAuth } from '@/src/hooks/useAuth';
import { useTheme } from '@/src/hooks/useTheme';
import { useGlobalThemedStyles } from '@/src/styles';
import { Marquee } from '@animatereactnative/marquee';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, FadeInLeft, FadeInRight, ZoomInUp } from 'react-native-reanimated';
import { product_images, strings } from './constants';
import { useThemedStyles } from './styles';

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

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

export function Profile() {
  const globalStyles = useGlobalThemedStyles();
  const styles = useThemedStyles()
  const colors = useTheme()
  const scrollRef = useRef<Animated.ScrollView>(null);
  const { token, user, isAuthenticated, login, logout } = useAuth();
  const { callEndpoint, loading, data, error } = useApi();
  const [visibleText, setVisibleText] = useState('');
  const typingSpeed = 10;

  useEffect(() => {
    setVisibleText('');
    let currentIndex = 0;
    const chars = [...strings.info];
    let interval: ReturnType<typeof setInterval>;

    const delayTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setVisibleText(prev => {
          const nextChar = chars[currentIndex];
          currentIndex++;
          if (currentIndex >= chars.length) {
            clearInterval(interval);
          }

          requestAnimationFrame(() => {
            scrollRef.current?.scrollToEnd({ animated: true });
          });
          return prev + (nextChar ?? '');
        });
      }, typingSpeed);
    }, 0);

    return () => {
      clearTimeout(delayTimeout);
      clearInterval(interval);
    };
  }, []);


  const images = useMemo(
    () => chunkArray(product_images, Math.floor(product_images.length / 3)),
    []
  );

  // log whenever auth state changes
  useEffect(() => {
    console.log("Auth State Changed:", { token, user, isAuthenticated });
  }, [token, user, isAuthenticated]);

  // for testing login functionality
  const _login = () => {
    login("demo-token", { id: "1", name: "Mukesh" })
  }

  // for testing logout functionality
  const _logout = () => {
    logout()
  }

  // log whenever API state changes
  useEffect(() => {
    console.log("🔄 Loading:", loading, "📦 Data:", data, "⚠️ Error:", error);
  }, [loading, data, error]);

  // API Tests
  const testGet = () =>
    callEndpoint({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts/1",
    });

  const testPost = () =>
    callEndpoint({
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      data: { title: "foo", body: "bar", userId: 1 },
    });

  const testPut = () =>
    callEndpoint({
      method: "PUT",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      data: { id: 1, title: "updated title", body: "updated body", userId: 1 },
    });

  const testDelete = () =>
    callEndpoint({
      method: "DELETE",
      url: "https://jsonplaceholder.typicode.com/posts/1",
    });

  // Run tests once on mount
  useEffect(() => {
    const runTests = async () => {
      console.log("🚀 Starting API tests...");

      console.log("▶️ Running GET...");
      await testGet();
      await wait(2000);

      console.log("▶️ Running POST...");
      await testPost();
      await wait(2000);

      console.log("▶️ Running PUT...");
      await testPut();
      await wait(2000);

      console.log("▶️ Running DELETE...");
      await testDelete();

      console.log("🎉 Finished API tests!");
    };

    runTests();
  }, []); // run only once

  const onLeftIconPress = () => {
    console.log('Send icon pressed')
  }

  const onRightIconPress = () => {
    console.log('Notification icon pressed')
  }

  return (
    <View style={globalStyles.mainContainer}>
      <CustomHeader
        title={strings.title}
        leftIcon="settings"
        rightIcon="bell"
        onLeftIconPress={onLeftIconPress}
        onRightIconPress={onRightIconPress}
      />
      <Animated.ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} style={styles.scrollView}>
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
          <View
            style={styles.contentView}>
            <Animated.View entering={ZoomInUp.duration(2500)} style={styles.avatarContainer}>
              <BlurView intensity={50} tint="light" style={[StyleSheet.absoluteFill, styles.blurContainer]}>
                <Image source={{ uri: `https://portfolio-lake-three-21.vercel.app/me.png` }} resizeMode="cover" style={styles.avatar} />
              </BlurView>
            </Animated.View>
            <Animated.Text
              entering={FadeInDown.springify()
                .damping(12)
                .delay(_initialDelay + 100)}
              style={styles.title}>
              {strings.name}
            </Animated.Text>
            <Animated.Text
              entering={FadeInDown.springify()
                .damping(12)
                .delay(_initialDelay + 200)}
              style={styles.sub_title}>
              {visibleText}
            </Animated.Text>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}
