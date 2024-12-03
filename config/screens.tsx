import { router } from 'expo-router';
import { ChevronLeft } from '@tamagui/lucide-icons';
import ActionIcon from '@components/shared/actionIcon';
import { ScreenProps } from 'expo-router/build/useScreens';
import React from 'react';
import { getBgColor } from '@utils/styles';
import { useColorScheme } from 'nativewind';

type StackScreenParams = void | {
  headerTitle?: React.ReactElement | void;
};

export const useStackScreenOptions = (params: StackScreenParams): ScreenProps['options'] => {
  const { colorScheme } = useColorScheme();
  const colorBg = getBgColor(colorScheme);

  const option: ScreenProps['options'] = {
    headerShown: true,
    headerTransparent: false,
    headerBackVisible: false,
    headerShadowVisible: false,
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: 'transparent' },
    contentStyle: { backgroundColor: colorBg },
    headerLeft: () => (
      <ActionIcon
        onlyIcon
        icon={<ChevronLeft color="$gray12" size="$1" />}
        variant="icon"
        onPress={router.back}
      />
    ),
    headerTitle: () => params?.headerTitle,
  };
  return option;
};

type TabScreenParams = {
  title: string;
  headerTitle?: React.ReactElement;
  Icon: React.FC<{ color: string; size: number }>;
};

export const useTabsScreenOptions = (params: TabScreenParams): ScreenProps['options'] => {
  const { title, Icon, headerTitle } = params;

  const { colorScheme } = useColorScheme();
  const colorBg = getBgColor(colorScheme);

  return {
    title,
    headerShown: true,
    headerTransparent: false,
    headerBackVisible: false,
    headerShadowVisible: false,
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: colorBg },
    contentStyle: { backgroundColor: colorBg },
    headerTitle: () => headerTitle,
    tabBarIcon: ({ color }: { color: string }) => <Icon color={color} size={26} />,
  };
};
