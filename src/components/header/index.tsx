import { useHaptics } from '@/src/hooks';
import { HIT_SLOP } from '@/src/utils/helper';
import { m } from '@/src/utils/metrics';
import { Feather, Fontisto } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { useThemedStyles } from './styles';

export type CustomHeaderProps = {
  leftIcon?: any;
  rightIcon?: any;
  title: string;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
};

function CustomHeaderComponent({
  leftIcon = 'send',
  rightIcon = 'bell',
  title,
  onLeftIconPress,
  onRightIconPress,
}: CustomHeaderProps) {
  const styles = useThemedStyles();
  const { selection } = useHaptics()
  return (
    <View style={styles.topBar}>

      <Pressable hitSlop={HIT_SLOP.small} onPress={() => {
        selection()
        onLeftIconPress?.();
      }}>
        <Feather
          style={{ transform: [{ rotate: '45deg' }] }}
          name={leftIcon}
          size={m(22)}
        />
      </Pressable>

      <Animated.View
        key={title}
        entering={ZoomIn.duration(200)}>
        <Text style={styles.brand}>{title}</Text>
      </Animated.View>

      <Pressable hitSlop={HIT_SLOP.small} onPress={() => {
        selection()
        onRightIconPress?.();
      }}>
        <Fontisto name={rightIcon} size={m(22)} />
      </Pressable>
    </View>
  );
}

const CustomHeader = memo(
  CustomHeaderComponent,
  (prev, next) =>
    prev.title === next.title &&
    prev.leftIcon === next.leftIcon &&
    prev.rightIcon === next.rightIcon &&
    prev.onLeftIconPress === next.onLeftIconPress &&
    prev.onRightIconPress === next.onRightIconPress
);

export default CustomHeader;
