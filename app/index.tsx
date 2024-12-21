import React from 'react';
import { Redirect, SplashScreen } from 'expo-router';
import { YStack } from 'tamagui';

import { Routes } from '@constants/routes';
import { useAppStore } from '@store/index';

SplashScreen.preventAutoHideAsync();

export default function Page() {
  const { user, tabSelected } = useAppStore();

  if (user) {
    return (
      <YStack justifyContent="center">
        <Redirect href={tabSelected ?? Routes.SEARCH} />
      </YStack>
    );
  }

  return (
    <YStack justifyContent="center">
      <Redirect href={Routes.LOGIN} />
    </YStack>
  );
}
