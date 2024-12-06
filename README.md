# Welcome to my App

This is an [Expo](https://expo.dev) app created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app). THe folder scaffold, UI components, API pattern (Datasource/Repository) and navigation was made by me.

The features of this app are:
- Navigation: Expo router
- UI: Tamagui, with custom design using Nativewind (check the folder `components/shared` to see the custom components)
- Light/Dark mode: The app has a light and dark mode, you can change it in the settings screen
- Typing system: The app uses TypeScript with Zod to create a type-safe system

## Get started

Requirements:
- Node.js 22 or higher
- Android API 30 or higher
- SDK Tools

## Firebase setup

This current project use the slug/package/bundleId of `dev.cardor.enmanuelmag.rn_challenge`. Remember to change it to your own package name and *generate your own keys* of `google-services.json` and `GoogleService-Info.plist` for android and iOS respectively.

> For android you have to have an emulator and at least API 30 installed, recommended to use Android Studio to create the virtual device and install the API 30 and SDK required
> You can see the instructions [here](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&buildEnv=local#set-up-android-studio)

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app for android

   ```bash
    npm run android
   ```

3. Start the app for ios (push notifications won't work on iOS simulator)

   ```bash
    npm run ios
   ```

Also a folder `keys` at the root of the project is required with the google-services.json file for android and the GoogleService-Info.plist for iOS, temporarily I will provide the keys in the repo for the app to work without any issues.

## Loom video

Here is the [link to the Loom video](https://www.loom.com/share/ca424cbdc2774fd08acde21be86e98c0?sid=6dbda562-ebdc-4432-aeea-8b842ebcc97e)