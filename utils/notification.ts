// import messaging from '@react-native-firebase/messaging';
// import { Platform, PermissionsAndroid } from 'react-native';
// import { NotificationDataType, NotificationForegroundType } from '@customTypes/notification';

import * as Burnt from 'burnt';
import type { BaseToastOptions } from 'burnt/build/types';

//import DataRepo from '@api/datasource';

// import { router } from 'expo-router';
// import { Routes } from '@constants/routes';
// const getFCMToken = async () => {
//   try {
//     const token = await messaging().getToken();
//     console.log('FCM Token:', token);

//     //await DataRepo.userService.registerToken(token);
//     return token;
//   } catch (error) {
//     console.error('Error getting FCM token:', error);
//     return null;
//   }
// };

// async function requestUserPermission() {
//   if (Platform.OS === 'ios') {
//     await messaging().requestPermission();
//     // const authStatus = await messaging().requestPermission();
//     // const enabled =
//     //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     // if (enabled) {
//     //   console.log('Authorization status:', authStatus);
//     // }
//   } else {
//     await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
//   }
// }

// type SetupNotificationsParams = {
//   setPopOverNotification: (popover: NotificationForegroundType) => void;
//   //make that setPushToken save token on zustand and call registerToken of userService
//   setPushToken: (token: string | null) => void;
// };

// export const setupNotifications = (params: SetupNotificationsParams) => {
//   try {
//     const { setPopOverNotification, setPushToken } = params;
//     // Foreground message handler
//     const messageUnsubscribe = messaging().onMessage(async (remoteMessage) => {
//       console.log('Foreground Message:', remoteMessage);
//       setPopOverNotification({
//         title: remoteMessage.notification?.title ?? 'New Pokemon found!',
//         body: remoteMessage.notification?.body ?? 'Let see it',
//         data: remoteMessage.data as NotificationDataType,
//       });
//     });

//     // Background message handler
//     messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//       console.log('Background Message:', remoteMessage);
//       // const { pokemonId } = remoteMessage.data as NotificationDataType;

//       // router.push(Routes.DETAIL.replace(':id', pokemonId));
//     });

//     // Handle notification open when app is in background/quit
//     const notificationUnsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
//       console.log('Notification opened:', remoteMessage);
//       // const { pokemonId } = remoteMessage.data as NotificationDataType;

//       // router.push(Routes.DETAIL.replace(':id', pokemonId));
//     });

//     // Check if app was opened from a notification when app was quit
//     messaging()
//       .getInitialNotification()
//       .then((remoteMessage) => {
//         if (remoteMessage) {
//           console.log('Notification when app if quit:', remoteMessage);
//         }
//       });

//     // Request permissions (will be handled by the native module)
//     requestUserPermission();

//     getFCMToken().then(setPushToken);

//     // Return cleanup function
//     return () => {
//       messageUnsubscribe();
//       notificationUnsubscribe();
//     };
//   } catch (error) {
//     console.error('Error setting up notifications:', error);
//     return () => {}; // Return empty cleanup function if setup fails
//   }
// };

// type RegisterFCMTokenParams = {
//   unRegisterToken: () => void;
// };
// export const unregisterFCMToken = async (params: RegisterFCMTokenParams) => {
//   try {
//     await messaging().deleteToken();
//     params.unRegisterToken();
//     //await DataRepo.userService.unregisterToken();
//     console.log('FCM Token deleted successfully');
//   } catch (error) {
//     console.error('Error deleting FCM token:', error);
//   }
// };

// type SendPushNotificationParams = {
//   data: NotificationDataType & { title: string; description: string };
//   pushToken: string;
// };

// export const sendPushNotification = async (params: SendPushNotificationParams) => {
//   try {
//     console.log('Sending push notification:', params);
//     const { data, pushToken } = params;
//     await messaging().sendMessage({
//       fcmOptions: {},
//       to: pushToken,
//       data,
//     });
//     console.log('Push notification sent successfully');
//   } catch (error) {
//     console.error('Error sending push notification:', error);
//   }
// };

export const toast = (params: BaseToastOptions) => {
  let haptic: BaseToastOptions['haptic'];

  if (params.preset) {
    switch (params.preset) {
      case 'done':
        haptic = 'success';
        break;
      case 'error':
        haptic = 'error';
        break;
      default:
        break;
    }
  }

  Burnt.toast({
    ...params,
    haptic,
  });
};
