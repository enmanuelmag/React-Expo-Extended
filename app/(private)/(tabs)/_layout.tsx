import React from 'react';
import { Tabs } from 'expo-router';

import { useColorScheme } from 'nativewind';
import { Settings, Users, List } from '@tamagui/lucide-icons';

import { useTabsScreenOptions } from '@config/screens';

import { getBgColor } from '@utils/styles';
import { isAndroid } from '@utils/platform';

import Logo from '@components/shared/logo';

import { useAppStore } from '@store/index';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();

  const { setTabSelected } = useAppStore();

  const colorBg = getBgColor(colorScheme);

  const catchTabConfig = useTabsScreenOptions({
    title: 'Pokedex',
    headerTitle: <Logo colored="dex" normal="Poke" />,
    Icon: List,
  });

  const teamTabConfig = useTabsScreenOptions({
    title: 'View Team',
    headerTitle: <Logo colored="Team" normal="View" />,
    Icon: Users,
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

          setTabSelected(name as 'pokedex' | 'team' | 'settings');
        },
      }}
      screenOptions={{
        tabBarShowLabel: true,
        headerStatusBarHeight: 0,
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#339AF0',
        tabBarStyle: {
          backgroundColor: colorBg,
          shadowColor: 'transparent',
          paddingTop: isAndroid ? 6 : 0,
          marginBottom: isAndroid ? 6 : 0,
          borderTopColor: colorScheme === 'dark' ? '#444' : '#DDD',
        },
      }}
    >
      <Tabs.Screen name="pokedex" options={catchTabConfig} />
      <Tabs.Screen name="team" options={teamTabConfig} />
      <Tabs.Screen name="settings" options={settingsTabConfig} />
    </Tabs>
  );
}
