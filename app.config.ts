import 'ts-node/register'; // Add this to import TypeScript files
import { ExpoConfig } from 'expo/config';

// In SDK 46 and lower, use the following import instead:
// import { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
  name: 'RN Challenge',
  slug: 'dev.cardor.enmanuelmag.rn-challenge',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  plugins: [
    'expo-router',
    '@react-native-firebase/app',
    '@react-native-firebase/auth',
    'expo-apple-authentication',
    [
      'expo-secure-store',
      {
        faceIDPermission: 'Allow Budgetfy to access your Face ID biometric data.',
      },
    ],
    [
      'expo-local-authentication',
      {
        faceIDPermission: 'Allow Budgetfy to use Face ID.',
      },
    ],
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
        },
      },
    ],
    [
      'expo-image-picker',
      {
        cameraPermission: 'Allow Budgetfy to access your camera to take photos',
        photosPermission:
          'Allow Budgetfy to access your photos to attach images to debtor payments',
      },
    ],
    [
      'expo-notifications',
      {
        color: '#FFFFFF',
        icon: './assets/icon.png',
        defaultChannel: 'default',
      },
    ],
  ],
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.enmanuelmag.rn-challenge',
    googleServicesFile: './keys/GoogleService-Info.plist',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'dev.cardor.enmanuelmag.rn_challenge',
    googleServicesFile: './keys/google-services.json',
  },
  experiments: {
    typedRoutes: false,
  },
};
export default config;
