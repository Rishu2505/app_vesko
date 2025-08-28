import { IMAGES } from '@/src/assets';
import { CustomHeader } from '@/src/components';
import { useGlobalThemedStyles } from '@/src/styles';
import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { strings } from './constants';
import { useThemedStyles } from './styles';

export function Cart() {
  const globalStyles = useGlobalThemedStyles();
  const styles = useThemedStyles();

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
        leftIcon="send"
        rightIcon="bell"
        onLeftIconPress={onLeftIconPress}
        onRightIconPress={onRightIconPress}
      />
      <Animated.View entering={FadeInDown.duration(800).springify().damping(5).stiffness(120)} style={styles.inProgressUI}>
        <Image style={styles.animation} source={IMAGES.IN_PROGRESS} />
        <Text style={styles.inProgress}>{strings.comingSoon}</Text>
      </Animated.View>
    </View>
  );
}
