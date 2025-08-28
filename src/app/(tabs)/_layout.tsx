import { HapticTab } from '@/src/components';
import { useTheme } from '@/src/hooks/useTheme';
import { useThemedStyles } from '@/src/styles';
import { m } from '@/src/utils/metrics';
import { Feather, FontAwesome5, Octicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import Animated, { StretchInX, ZoomInEasyDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const unstable_settings = {
  initialRouteName: "home/index",
};

const TAB_ITEMS = [
  {
    name: "home/index",
    icon: (color: string) => <Octicons name="home" size={m(22)} color={color} />,
  },
  {
    name: "search/index",
    icon: (color: string) => <Octicons name="search" size={m(22)} color={color} />,
  },
  {
    name: "post/index",
    icon: (color: string) => <Octicons name="plus-circle" size={m(22)} color={color} />,
    activeStyle: "inactiveTab",
  },
  {
    name: "cart/index",
    icon: (color: string) => <Feather name="shopping-cart" size={m(23)} color={color} />,
  },
  {
    name: "profile/index",
    icon: (color: string) => <FontAwesome5 name="user" size={m(22)} color={color} />,
  },
];

function TabIcon({ focused, color, icon, activeStyle, iconKey }: any) {
  const bottomTabStyles = useThemedStyles();
  return (
    <View style={bottomTabStyles.tabIconContainer}>
      <Animated.View
        key={focused ? `${iconKey}-${Math.random()}-${Math.random()}` : `${iconKey}-${Math.random()}`}
        entering={StretchInX.duration(300).springify().damping(10).stiffness(120)}
      >
        <View
          style={[
            bottomTabStyles.inactiveTab,
            focused && (activeStyle ?? bottomTabStyles.activeTab),
          ]}
        />
      </Animated.View>
      <Animated.View
        key={focused ? `${iconKey}-${Math.random()}` : iconKey}
        entering={ZoomInEasyDown.duration(300)}
      >
        {icon(color)}
      </Animated.View>
    </View>
  );
}

export default function TabLayout() {
  const bottomTabStyles = useThemedStyles();
  const insets = useSafeAreaInsets();
  const colors = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: [
          bottomTabStyles.tabBar,
          { paddingBottom: Math.max(insets.bottom - 4, 0) },
        ],
        tabBarItemStyle: bottomTabStyles.tabBarItemStyle,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
      }}
    >
      {TAB_ITEMS.map(({ name, icon, activeStyle }, index) => (
        <Tabs.Screen
          key={index}
          name={name}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                focused={focused}
                color={color}
                icon={icon}
                activeStyle={activeStyle}
                iconKey={name}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
