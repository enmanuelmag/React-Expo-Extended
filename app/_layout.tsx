import React from 'react';
import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TamaguiProvider, Theme, PortalProvider } from 'tamagui';

import tamaguiConfig from '@config/theme';

//SplashScreen.preventAutoHideAsync();

export default function Page() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <PortalProvider shouldAddRootHost>
        <Theme>
          <SafeAreaView className="cd-flex-1">
            <Slot />
          </SafeAreaView>
        </Theme>
      </PortalProvider>
    </TamaguiProvider>
  );
}
