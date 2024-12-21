import React from 'react';
import { Text } from 'tamagui';
import { Stack } from 'expo-router/stack';
export { ErrorBoundary } from 'expo-router';
import { useColorScheme } from 'nativewind';

import { useStackScreenOptions } from '@config/screens';

import { getBgColor } from '@utils/styles';
import { isAndroid } from '@utils/platform';
import { setupNotifications } from '@utils/notification';
import ConfirmModal from '@components/shared/confirmModal';
import { useAppStore } from '@store/index';
import { Routes } from '@constants/routes';
import { router } from 'expo-router';

export default function Layout() {
  const { popOverNotification, setPushToken, setPopOverNotification } = useAppStore();

  const { colorScheme } = useColorScheme();

  const colorBg = getBgColor(colorScheme);

  const detailConfig = useStackScreenOptions({
    headerTitle: <Text className="cd-text-app cd-text-lg dark:cd-text-app-dark">Detail</Text>,
  });

  React.useEffect(() => {
    const unsubscribe = setupNotifications({
      setPopOverNotification,
      setPushToken,
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: colorBg,
          },
          statusBarHidden: isAndroid ? false : undefined,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="detail/[id]" options={detailConfig} />
      </Stack>
      <ConfirmModal
        closeText="Not now"
        confirmColor="green"
        confirmText="Let see it!"
        content={
          <Text className="cd-text-base cd-text-gray-800 dark:cd-text-gray-200">
            A new{' '}
            <Text className="cd-font-bold">
              {popOverNotification?.data?.pokemonName ?? 'Pokemon'}
            </Text>{' '}
            has been found! Do you want to see it?
          </Text>
        }
        open={!!popOverNotification}
        title={popOverNotification?.title ?? 'New Pokemon found!'}
        onClose={() => setPopOverNotification(null)}
        onConfirm={() => {
          if (!popOverNotification?.data?.pokemonId) return;

          router.push(Routes.DETAIL.replace(':id', popOverNotification?.data.pokemonId));
        }}
        onOpenChange={(v) => {
          if (!v) {
            setPopOverNotification(null);
          }
        }}
      />
    </React.Fragment>
  );
}
