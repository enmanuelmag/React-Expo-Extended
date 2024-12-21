import React from 'react';
import { Tabs } from 'expo-router';

import { useColorScheme } from 'nativewind';
import { Settings, Search } from '@tamagui/lucide-icons';

import { useTabsScreenOptions } from '@config/screens';

import { getBgColor } from '@utils/styles';
import { isAndroid } from '@utils/platform';

import Logo from '@components/shared/logo';

import { useAppStore } from '@store/index';
import { ColorsTabs } from '@constants/Colors';
import { RoutesType } from '@constants/routes';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();

  const { setTabSelected } = useAppStore();

  const colorBg = getBgColor(colorScheme);

  const searchTabConfig = useTabsScreenOptions({
    title: 'Search',
    headerTitle: <Logo colored="dex" normal="Poke" />,
    Icon: Search,
  });

  const settingsTabConfig = useTabsScreenOptions({
    title: 'Settings',
    headerTitle: <Logo colored="" normal="Settings" />,
    Icon: Settings,
  });

  return (
    <Tabs
      screenListeners={{
        tabPress: (e) => {
          if (!e.target) return;

          const [name] = e.target.split('-');

          setTabSelected(name as RoutesType);
        },
      }}
      screenOptions={{
        tabBarShowLabel: true,
        headerStatusBarHeight: 0,
        headerTitleAlign: 'center',
        tabBarActiveTintColor: ColorsTabs[colorScheme].tint,
        tabBarStyle: {
          backgroundColor: colorBg,
          shadowColor: 'transparent',
          paddingTop: isAndroid ? 6 : 0,
          marginBottom: isAndroid ? 6 : 0,
          borderTopColor: colorScheme === 'dark' ? '#444' : '#DDD',
        },
      }}
    >
      <Tabs.Screen name="search" options={searchTabConfig} />
      <Tabs.Screen name="settings" options={settingsTabConfig} />
    </Tabs>
  );
}
