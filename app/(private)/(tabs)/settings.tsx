/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { router, Stack } from 'expo-router';
import { Text, YStack } from 'tamagui';
import { LogOut } from '@tamagui/lucide-icons';
import { useQueryClient } from '@tanstack/react-query';

import DataRepo from '@api/datasource';

import { useAppStore } from '@store/index';

import Logo from '@components/shared/logo';
import ButtonCustom from '@components/shared/button';
import SwitchWithLabel from '@components/shared/switchCustom';
import { Routes } from '@constants/routes';

const Settings = () => {
  const queryClient = useQueryClient();

  const { user, theme, setTheme, clear } = useAppStore();
  return (
    <YStack
      className="cd-bg-white cd-h-full cd-pt-[12] cd-pb-[24] dark:cd-bg-black"
      justifyContent="space-between"
      padding="$4"
    >
      <Stack.Screen
        options={{
          headerTitle: () => <Logo colored="tings" normal="Set" />,
        }}
      />
      <YStack gap="$4" paddingHorizontal="$1">
        <Text className="cd-text-lg cd-text-gray-800 dark:cd-text-gray-100">
          Welcome <Text className="cd-font-semibold">{user?.displayName ?? user?.email}!</Text>
        </Text>

        <SwitchWithLabel
          fullWidth
          label="Dark mode"
          name="darkMode"
          value={theme === 'dark'}
          onChange={(value) => setTheme(value ? 'dark' : 'light')}
        />
      </YStack>
      <YStack gap="$3" justifyContent="flex-end">
        <ButtonCustom
          color="red"
          iconLeft={<LogOut color="white" size="$1" />}
          text="Logout"
          variant="outline"
          onPress={() => {
            DataRepo.userService.logout().finally(() => {
              router.replace(Routes.LOGIN);
              queryClient.clear();
              clear();
            });
          }}
        />
      </YStack>
    </YStack>
  );
};

export default Settings;
