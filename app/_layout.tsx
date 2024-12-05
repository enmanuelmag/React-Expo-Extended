import React from 'react';
import { Appearance } from 'react-native';
import tamaguiConfig from '@config/theme';
import * as SystemUI from 'expo-system-ui';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { SplashScreen, Slot, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TamaguiProvider, Theme, PortalProvider } from 'tamagui';
import { QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import queryClient, { asyncStoragePersister } from '@api/datasource/query';

import { useAppStore } from '@store/index';

import { Routes } from '@constants/routes';

const Provider = process.env.EXPO_PUBLIC_IS_DEV ? QueryClientProvider : PersistQueryClientProvider;

SplashScreen.preventAutoHideAsync();

export default function Page() {
  const { user, usedSystemTheme, tabSelected, theme, setTheme, setUsedSystemTheme } = useAppStore();

  const { colorScheme, setColorScheme } = useColorScheme();

  React.useEffect(() => {
    SplashScreen.hideAsync();
    if (!user) {
      router.push(Routes.LOGIN);
    } else {
      router.push(tabSelected ?? Routes.POKEDEX);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  React.useEffect(() => {
    if (!usedSystemTheme) {
      const systemColorScheme = Appearance.getColorScheme();
      setTheme(systemColorScheme === 'light' ? 'light' : 'dark');
      setUsedSystemTheme(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usedSystemTheme]);

  React.useEffect(() => {
    setColorScheme(theme === 'light' ? 'light' : 'dark');
    SystemUI.setBackgroundColorAsync(theme === 'light' ? 'white' : 'black');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return (
    <Provider
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersister,
      }}
    >
      <TamaguiProvider config={tamaguiConfig}>
        <PortalProvider shouldAddRootHost>
          <Theme name={colorScheme}>
            {colorScheme === 'dark' && <StatusBar style="light" />}
            <SafeAreaView className="cd-flex-1">
              <Slot />
            </SafeAreaView>
          </Theme>
        </PortalProvider>
      </TamaguiProvider>
    </Provider>
  );
}
