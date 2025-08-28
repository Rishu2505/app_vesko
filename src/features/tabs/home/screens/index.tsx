import { CustomHeader } from '@/src/components';
import { ProductPost } from '@/src/types/productPost';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { ProductPostCard } from '../components';
import { strings } from './constants';

import postsData from '@/src/assets/jsons/posts.json';
import { useHaptics } from '@/src/hooks';
import { useGlobalThemedStyles } from '@/src/styles';

export function Home() {
  const { selection } = useHaptics();
  const globalStyles = useGlobalThemedStyles();
  const [posts, setPosts] = useState<ProductPost[]>(postsData);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleLikedPost = useCallback((id: string) => {
    selection();
    setPosts(prev =>
      prev.map(post =>
        post.id === id
          ? {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          }
          : post
      )
    );
  }, []);

  const toggleSavedPost = useCallback((id: string) => {
    selection();
    setPosts(prev =>
      prev.map(post =>
        post.id === id
          ? {
            ...post,
            isSaved: !post.isSaved,
          }
          : post
      )
    );
  }, []);

  const toggleExpand = useCallback((id: string) => {
    selection();
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);


  const renderItem: ListRenderItem<ProductPost> = useCallback(
    ({ item, index }) => (
      <ProductPostCard
        item={item}
        index={index}
        onLike={toggleLikedPost}
        onSave={toggleSavedPost}
        expanded={expandedIds.has(item.id)}
        onToggleExpand={toggleExpand}
      />
    ),
    [toggleLikedPost, toggleSavedPost, toggleExpand, expandedIds]
  );

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
      <FlashList
        data={posts}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        estimatedItemSize={100}
        contentContainerStyle={{ paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
        extraData={expandedIds}
      />
    </View>
  );
}
