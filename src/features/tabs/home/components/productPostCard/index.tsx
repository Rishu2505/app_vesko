import { useHaptics, useShare } from '@/src/hooks';
import { usePopAnimation } from '@/src/hooks/usePopAnimation';
import { useTheme } from '@/src/hooks/useTheme';
import { ProductPost } from '@/src/types/productPost';
import { timeAgo } from '@/src/utils/helper';
import { h, m } from '@/src/utils/metrics';
import { AntDesign, Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { ImageBackground } from 'expo-image';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInLeft, FadeInRight, LinearTransition } from 'react-native-reanimated';
import { ExpandableDescription, LikeButton } from '..';
import { useThemedStyles } from './styles';

type Props = {
  item: ProductPost;
  index: number;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  expanded: boolean;
  onToggleExpand: (id: string) => void;
};

export default function ProductPostCard({ item, index, onLike, onSave, expanded, onToggleExpand, }: Props) {
  const styles = useThemedStyles();
  const colors = useTheme();
  const { selection } = useHaptics();
  const { share } = useShare();

  const shareIntent = (content: string) => () => {
    selection()
    share('Vesko', content, 'https://vesko.fi/')
  }

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).duration(800)}
      layout={LinearTransition.springify().damping(18).stiffness(160)}>
      <ImageBackground source={{ uri: item.image }} style={styles.card}>

        <View style={styles.innerView}>
          <BlurView style={styles.shadowBottom} intensity={8} tint="light" >
            <View style={styles.header}>
              <View style={styles.userInfo}>
                <TouchableOpacity onPress={() => {
                  selection()
                }} style={styles.avatarCircle}>
                  <BlurView intensity={50} tint="light" style={[StyleSheet.absoluteFill, { justifyContent: 'center' }]}>
                    <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
                  </BlurView>
                </TouchableOpacity>
                <View style={[styles.userInfo, { flexDirection: 'column' }]}>
                  <Animated.Text entering={FadeInRight.delay(index * 200).duration(800)} style={styles.username}>{item.user.name}</Animated.Text>
                  <Animated.Text entering={FadeInRight.delay(index * 200).duration(800)} style={styles.locationText}>{`${timeAgo(item.createdAt)} • ${item.location}`}</Animated.Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => {
                selection()
              }} style={styles.actionItem}>
                <Entypo name="dots-three-horizontal" size={m(20)} color={colors.text_invert} />
              </TouchableOpacity>
            </View>
          </BlurView>

          <BlurView style={[styles.actionButtonContainer, styles.shadowTop]} intensity={8} tint="light" >
            <View style={styles.actions}>
              <View style={[styles.actionItem, { width: h(50) }]}>
                <LikeButton
                  isLiked={item.isLiked}
                  onLike={() => onLike(item.id)}
                  size={m(20)}
                />
                <Text style={styles.actionText}>{item.likes}</Text>
              </View>

              <View style={styles.actionItem}>
                <TouchableOpacity onPress={() => {
                  selection()
                }} >
                  <AntDesign name="message1" size={m(19)} color={colors.text_invert} />
                </TouchableOpacity>
                <Text style={styles.actionText}>{item.comments}</Text>
              </View>
              <View style={styles.actionItem}>
                <TouchableOpacity onPress={shareIntent(item.description)}>
                  <Feather name="send" size={m(20)} color={colors.text_invert} />
                </TouchableOpacity>
                <Text style={styles.actionText}>{item.shares}</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => onSave(item.id)} style={[styles.actionItemSave, { marginRight: 0 }]}>
              <Animated.View style={usePopAnimation(item.isSaved)}>
                {item.isSaved ?
                  <FontAwesome
                    name={'bookmark'}
                    size={m(20)}
                    color={colors.text_invert}
                  />
                  :
                  <FontAwesome
                    name={'bookmark-o'}
                    size={m(20)}
                    color={colors.text_invert}
                  />
                }
              </Animated.View>
            </TouchableOpacity>
          </BlurView>
        </View>
      </ImageBackground>
      <View>

        <View style={styles.footer}>
          <View style={styles.flex}>
            <Animated.Text entering={FadeInLeft.delay(index * 200).duration(800)} style={styles.productTitle}>{item.title}</Animated.Text>
            <View style={styles.row}>
              <Animated.Text entering={FadeInLeft.delay(index * 200).duration(800)} style={styles.category}>{item.category}</Animated.Text>
              <View style={styles.priceRow}>
                <Text style={styles.oldPrice}>{item.oldPrice}</Text>
                <Text style={styles.newPrice}>{item.price}</Text>
              </View>
            </View>
          </View>
          <Animated.View entering={FadeInRight.delay(index * 200).duration(800)}>
            <TouchableOpacity onPress={() => {
              selection()
            }} style={styles.buyBtn}>
              <Text style={styles.buyBtnText}>Buy now</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <ExpandableDescription
          store={item.store}
          description={item.description}
          expanded={expanded}
          onToggleExpand={() => onToggleExpand(item.id)}
          index={index}
        />
      </View>
    </Animated.View>
  );
}
