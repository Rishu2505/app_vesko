import { CustomHeader } from '@/src/components';
import { useGlobalThemedStyles } from '@/src/styles';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { strings } from './constants';

export function Login() {
  const globalStyles = useGlobalThemedStyles();

  useEffect(() => {
  }, []);

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
    </View>
  );
}
