import 'react-native-get-random-values';
import auth from '@react-native-firebase/auth';
import * as SecureStore from 'expo-secure-store';
import firestore from '@react-native-firebase/firestore';
import * as LocalAuthentication from 'expo-local-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import type { ReactNativeFirebase } from '@react-native-firebase/app';

import * as AppleAuthentication from 'expo-apple-authentication';

type FirebaseError = ReactNativeFirebase.NativeFirebaseError;

import type { UserType } from '@customTypes/user';

import DataDS from '@api/domain/ds/DataDS';

import { Logger } from '@utils/log';
import { ErrorCodes, ErrorService } from '@utils/errors';

import { router } from 'expo-router';
import { Routes } from '@constants/routes';
import {
  AUTH_METHOD_KEY,
  AUTH_METHODS,
  AuthMethodType,
  FIREBASE_ID_TOKEN,
  USERS_COLLECTION,
  SECRET_EMAIL,
  SECRET_PASSWORD,
  CHECK_BIOMETRIC,
} from '@constants/datasource';

const ConfigCredentials = {
  firebaseProviders: {
    webClientId: '372845332658-4gqaf5ro15da2lg946d7ojgavaa6do4h.apps.googleusercontent.com', //process.env.EXPO_PUBLIC_ANDROID_FIREBASE_CLIENT_ID,
  },
};

const CACHE_SIZE_BYTES = 512 * 1024 * 1024;

class FirebaseDS extends DataDS {
  constructor() {
    super();
    firestore().settings({
      persistence: true,
      ignoreUndefinedProperties: true,
      cacheSizeBytes: CACHE_SIZE_BYTES,
    });
  }

  async signinWithGoogle() {
    try {
      GoogleSignin.configure({
        webClientId: ConfigCredentials.firebaseProviders.webClientId,
      });

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      const signInResult = await GoogleSignin.signIn();

      const idToken = signInResult.data?.idToken;

      if (!idToken) {
        throw new Error('No ID token found');
      }

      // eslint-disable-next-line import/no-named-as-default-member
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const { user: userGoogle } = await auth().signInWithCredential(googleCredential);

      const user: UserType = {
        displayName: userGoogle.displayName,
        email: userGoogle.email,
        uid: userGoogle.uid,
        type: 'google',
        metadata: {},
      };

      return user;
    } catch (error) {
      Logger.error('Error login with Google', error);
      throw ErrorService.getErrorFromCode(ErrorCodes.ERROR_LOGIN_WITH_GOOGLE);
    }
  }

  async signinWithApple() {
    try {
      // Start the sign-in request
      const appleAuthRequestResponse = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // signed in

      const { identityToken } = appleAuthRequestResponse;
      if (!identityToken) {
        throw new Error('Apple Sign-In failed - no authorization code returned');
      }

      // eslint-disable-next-line import/no-named-as-default-member
      const appleCredential = auth.AppleAuthProvider.credential(identityToken);

      // Sign the user in with the credential
      const { user: userApple } = await auth().signInWithCredential(appleCredential);

      const user: UserType = {
        displayName: userApple.displayName ?? appleAuthRequestResponse.fullName?.givenName,
        email: userApple.email ?? appleAuthRequestResponse.email,
        uid: userApple.uid,
        type: 'apple',
        metadata: {},
      };

      return user;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const e = error as any;
      if (e.code !== 'ERR_REQUEST_CANCELED') {
        Logger.error('Error login with Apple', error);
        throw error;
      }

      return null;
    }
  }

  async signinAnonymously() {
    try {
      const { user: userSDK } = await auth().signInAnonymously();

      const user: UserType = {
        displayName: userSDK.displayName,
        email: userSDK.email,
        uid: userSDK.uid,
        type: 'anonymous',
        metadata: {},
      };

      const idTokenFirebase = await userSDK.getIdToken();

      await SecureStore.setItemAsync(FIREBASE_ID_TOKEN, idTokenFirebase);

      await SecureStore.setItemAsync(AUTH_METHOD_KEY, AUTH_METHODS.anonymous);

      return user;
    } catch (error) {
      Logger.error('Error login anonymously', error);
      throw ErrorService.getErrorFromCode(ErrorCodes.ERROR_LOGIN_ANONYMOUSLY);
    }
  }

  async checkBiometric(): Promise<boolean> {
    try {
      const checkBiometricSecret = await SecureStore.getItemAsync(CHECK_BIOMETRIC);

      if (!checkBiometricSecret) {
        return true;
      }

      const reusltAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to continue',
      });

      if (!reusltAuth.success) {
        // throw ErrorService.getErrorFromCode(ErrorCodes.ERROR_LOCAL_AUTH);
        return false;
      }

      return true;
    } catch (error) {
      Logger.error('Error checking biometric', error);
      throw error;
    }
  }

  async setCheckBiometric(value: boolean) {
    try {
      if (value) {
        await SecureStore.setItemAsync(CHECK_BIOMETRIC, value.toString());
      } else {
        await SecureStore.deleteItemAsync(CHECK_BIOMETRIC);
      }
      return value;
    } catch (error) {
      Logger.error('Error setting biometric', error);
      throw error;
    }
  }

  async getCheckBiometric() {
    try {
      const checkBiometricSecret = await SecureStore.getItemAsync(CHECK_BIOMETRIC);

      return Boolean(checkBiometricSecret);
    } catch (error) {
      Logger.error('Error getting biometric', error);
      throw error;
    }
  }

  async signinWithEmailAndPassword(email: string, password: string) {
    try {
      const { user: userSDK } = await auth().signInWithEmailAndPassword(email, password);

      const user: UserType = {
        displayName: userSDK.displayName,
        email: userSDK.email,
        uid: userSDK.uid,
        type: 'email',
        metadata: {},
      };

      const idTokenFirebase = await userSDK.getIdToken();

      await SecureStore.setItemAsync(FIREBASE_ID_TOKEN, idTokenFirebase);

      await SecureStore.setItemAsync(AUTH_METHOD_KEY, AUTH_METHODS.email);

      await SecureStore.setItemAsync(SECRET_EMAIL, email);

      await SecureStore.setItemAsync(SECRET_PASSWORD, password);

      return user;
    } catch (error) {
      Logger.error('Error login with email and password', error);

      const errorFirebase = error as FirebaseError;
      if (errorFirebase.code === 'auth/user-not-found') {
        throw ErrorService.getErrorFromCode(ErrorCodes.ERROR_USER_NOT_FOUND);
      } else if (errorFirebase.code === 'auth/invalid-credential') {
        throw ErrorService.getErrorFromCode(ErrorCodes.ERROR_USER_NOT_FOUND);
      } else {
        throw ErrorService.getErrorFromCode(ErrorCodes.ERROR_LOGIN_WITH_EMAIL_AND_PASSWORD);
      }
    }
  }

  async signUpWithEmailAndPassword(email: string, password: string) {
    try {
      const { user: userSDK } = await auth().createUserWithEmailAndPassword(email, password);

      const user: UserType = {
        displayName: userSDK.displayName,
        email: userSDK.email,
        uid: userSDK.uid,
        type: 'email',
        metadata: {},
      };

      const idTokenFirebase = await userSDK.getIdToken();

      await SecureStore.setItemAsync(FIREBASE_ID_TOKEN, idTokenFirebase);

      await SecureStore.setItemAsync(AUTH_METHOD_KEY, AUTH_METHODS.email);

      await SecureStore.setItemAsync(SECRET_EMAIL, email);

      await SecureStore.setItemAsync(SECRET_PASSWORD, password);

      return user;
    } catch (error) {
      Logger.error('Error register with email and password', error);

      throw ErrorService.getErrorFromCode(ErrorCodes.ERROR_REGISTER_WITH_EMAIL_AND_PASSWORD);
    }
  }

  async signInWithLocalAuth() {
    try {
      const reusltAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to continue',
      });

      if (!reusltAuth.success) {
        if (reusltAuth.error === 'user_cancel') {
          throw ErrorService.getErrorFromCode(ErrorCodes.ERROR_LOCAL_AUTH_CANCELLED);
        }
        throw ErrorService.getErrorFromCode(ErrorCodes.ERROR_LOCAL_AUTH);
      }

      const method = await SecureStore.getItemAsync(AUTH_METHOD_KEY);

      const methodCast = method as AuthMethodType;

      let user: UserType | null = null;

      if (methodCast === 'email') {
        const emailSecret = await SecureStore.getItemAsync(SECRET_EMAIL);

        const passwordSecret = await SecureStore.getItemAsync(SECRET_PASSWORD);

        if (!emailSecret || !passwordSecret) {
          throw ErrorService.getErrorFromCode(ErrorCodes.ERROR_NOT_FIRST_SIGN_IN);
        }

        const response = await auth().signInWithEmailAndPassword(emailSecret, passwordSecret);

        user = {
          displayName: response.user?.displayName,
          email: response.user?.email,
          uid: response.user?.uid,
          metadata: {},
          type: 'email',
        };
      } else {
        throw ErrorService.getErrorFromCode(ErrorCodes.ERROR_NOT_FIRST_SIGN_IN);
      }

      if (!user) {
        Logger.error('User not found');
        throw ErrorService.getErrorFromCode(ErrorCodes.ERROR_GETTING_USER_SECRET);
      }

      return user;
    } catch (error) {
      Logger.error('Error local auth', error);
      throw error;
    }
  }

  parseProviderId(providerId: string): AuthMethodType {
    if (providerId.includes('password')) {
      return 'email';
    } else if (providerId.includes('google')) {
      return 'google';
    } else if (providerId.includes('apple')) {
      return 'apple';
    }
    return 'anonymous';
  }

  async getUser() {
    try {
      const user = auth().currentUser;

      if (user) {
        const userRef = firestore().collection(USERS_COLLECTION).doc(user.uid);

        const userSnap = await userRef.get();

        const userData: UserType = {
          displayName: user.displayName,
          email: '',
          uid: user.uid,
          type: this.parseProviderId(user.providerId),
          metadata: userSnap.data()?.metadata ?? {},
        };

        return userData;
      }

      return null;
    } catch (error) {
      Logger.error('Error getting user from Firebase', error);
      router.push(Routes.LOGIN);
      throw ErrorService.getErrorFromCode(ErrorCodes.ERROR_SESSION_EXPIRED);
    }
  }

  async logout() {
    try {
      await auth().signOut();
    } catch (error) {
      Logger.error('Error logout', error);
      throw ErrorService.getErrorFromCode(ErrorCodes.ERROR_LOGOUT);
    }
  }

  async deleteAccount() {
    try {
      const user = auth().currentUser;

      if (!user) {
        Logger.error('User not found');
        throw ErrorService.getErrorFromCode(ErrorCodes.ERROR_GETTING_USER);
      }

      await user.delete();
    } catch (error) {
      Logger.error('Error deleting account', error);
      throw ErrorService.getErrorFromCode(ErrorCodes.ERROR_DELETING_ACCOUNT);
    }
  }
}

export default FirebaseDS;
