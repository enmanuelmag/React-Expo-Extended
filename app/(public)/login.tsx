/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import * as Burnt from 'burnt';
import { Link, router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator, Text, View, YStack } from 'tamagui';
import * as LocalAuthentication from 'expo-local-authentication';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Fingerprint, LogIn, ScanEye, ScanFace } from '@tamagui/lucide-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { LocalAuthMethodType, LoginSchema, type LoginType } from '@customTypes/auth';

import DataRepo from '@api/datasource';

import { Routes } from '@constants/routes';
import QKeys from '@constants/reactAPI';
import { UserType } from '@customTypes/user';

import { isIOS } from '@utils/platform';
import { ErrorCodes, ErrorService } from '@utils/errors';

import { useAppStore } from '@store/index';
import Logo from '@components/shared/logo';
import InputText from '@components/shared/inputText';
import ButtonCustom from '@components/shared/button';
import DismissKeyboardHOC from '@components/shared/dismissKeyboardHOC';
import { $ } from '@utils/styles';

const Login = () => {
  const queryClient = useQueryClient();
  const { clear, setUser } = useAppStore();

  const { colorScheme } = useColorScheme();

  const localAuthQuery = useQuery<LocalAuthMethodType | null, ErrorService>({
    retry: 1,
    networkMode: 'always',
    queryKey: ['localAuth'],
    queryFn: async () => {
      const hasLocalAuth = await LocalAuthentication.hasHardwareAsync();
      const hasEnrolledAuth = (await LocalAuthentication.isEnrolledAsync()) || true;

      if (!hasLocalAuth || !hasEnrolledAuth) return null;

      const method = await LocalAuthentication.supportedAuthenticationTypesAsync();

      if (method.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
        return 'faceId';
      }

      if (method.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
        return 'fingerprint';
      }

      if (method.includes(LocalAuthentication.AuthenticationType.IRIS)) {
        return 'iris';
      }

      return null;
    },
  });

  const loginMutation = useMutation<UserType, ErrorService, LoginType>({
    networkMode: 'always',
    mutationKey: [QKeys.LOGIN_KEY],
    mutationFn: async (data) => {
      const response = await DataRepo.signinWithEmailAndPassword(data.email, data.password);
      queryClient.clear();
      clear();
      return response;
    },
    onSettled: (userData, error) => {
      if (error) {
        Burnt.toast({
          preset: 'error',
          title: error?.message || 'An error occurred',
        });
      }
      if (userData) {
        setUser(userData);
        router.push(Routes.HOME);
      }
    },
  });

  const loginGoogleMutation = useMutation<UserType, ErrorService>({
    networkMode: 'always',
    mutationKey: [QKeys.LOGIN_GOOGLE_KEY],
    mutationFn: async () => {
      const response = await DataRepo.signinWithGoogle();
      queryClient.clear();
      clear();
      return response;
    },
    onSettled: (userData, error) => {
      if (error || !userData) {
        Burnt.toast({
          preset: 'error',
          title: error?.message || 'An error occurred',
        });
      }
      if (userData) {
        setUser(userData);
        router.push(Routes.HOME);
      }
    },
  });

  const loginAppleMutation = useMutation<UserType | null, ErrorService>({
    networkMode: 'always',
    mutationKey: [QKeys.LOGIN_APPLE_KEY],
    mutationFn: async () => {
      const response = await DataRepo.signinWithApple();
      queryClient.clear();
      clear();
      return response;
    },
    onSettled: (userData, error) => {
      if (error || !userData) {
        Burnt.toast({
          preset: 'error',
          title: error?.message || 'An error occurred',
        });
      }
      if (userData) {
        setUser(userData);
        router.push(Routes.HOME);
      }
    },
  });

  const loginIdTokenMutation = useMutation<UserType, ErrorService>({
    networkMode: 'always',
    mutationKey: [QKeys.LOGIN_ID_TOKEN_KEY],
    mutationFn: async () => {
      const response = await DataRepo.signInWithLocalAuth();
      queryClient.clear();
      clear();
      return response;
    },
    onSettled: (userData, error) => {
      if (error) {
        if (error.code === ErrorCodes.ERROR_LOCAL_AUTH_INVALID.code) {
          Burnt.toast({
            title: ErrorCodes.ERROR_LOCAL_AUTH_INVALID.message,
            preset: 'error',
          });
          return;
        } else if (error.code === ErrorCodes.ERROR_NO_ENROLLED_AUTH.code) {
          Burnt.toast({
            title: ErrorCodes.ERROR_NO_ENROLLED_AUTH.message,
            preset: 'error',
          });
          return;
        } else if (error.code === ErrorCodes.ERROR_LOCAL_AUTH_CANCELLED.code) {
          return;
        }
        Burnt.toast({
          preset: 'error',
          title: error?.message || 'An error occurred',
        });
      }
      if (userData) {
        setUser(userData);
        router.push(Routes.HOME);
      }
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    defaultValues: {
      email: '',
      password: '',
      withGoogle: false,
    },
    resolver: zodResolver(LoginSchema),
  });

  React.useEffect(() => {}, []);

  return (
    <DismissKeyboardHOC>
      <View className="cd-h-full cd-flex cd-justify-center cd-flex-col">
        <YStack gap="$4" padding="$6">
          <Logo classes="cd-text-4xl cd-mb-[12]" colored="fy" normal="Budget" />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <InputText
                autoCapitalize="none"
                autoComplete="email"
                error={errors.email?.message}
                keyboardType="email-address"
                label="Email"
                placeholder="Your email"
                textContentType="emailAddress"
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <InputText
                isPassword
                autoCapitalize="none"
                autoComplete="current-password"
                error={errors.password?.message}
                label="Password"
                placeholder="**********"
                textContentType="password"
                {...field}
              />
            )}
          />

          <View className="cd-flex cd-flex-row">
            <View
              className={$(
                'cd-grow cd-basis-[100%]',
                localAuthQuery.data && 'cd-grow cd-basis-[80%] cd-pr-[4]',
              )}
            >
              <ButtonCustom
                disabled={loginGoogleMutation.isPending && !loginGoogleMutation.isIdle}
                loading={loginMutation.isPending && !loginMutation.isIdle}
                text="Sign in with Email"
                variant="primary"
                onPress={handleSubmit((data) => loginMutation.mutate(data))}
              />
            </View>
            {localAuthQuery.data && (
              <View className="cd-basis-[20%]">
                <ButtonCustom
                  disabled={loginIdTokenMutation.isPending && !loginIdTokenMutation.isIdle}
                  iconLeft={getIcon(localAuthQuery.data)}
                  variant="auth"
                  onPress={loginIdTokenMutation.mutate}
                />
              </View>
            )}
          </View>

          <YStack className="cd-mt-[8]" gap="$2.5">
            <View className="cd-grow">
              <ButtonCustom
                color="google"
                disabled={loginMutation.isPending && !loginMutation.isIdle}
                iconLeft={<LogIn />}
                loading={loginGoogleMutation.isPending && !loginGoogleMutation.isIdle}
                text="Sign in with Google"
                variant="outline"
                onPress={loginGoogleMutation.mutate}
              />
            </View>
            {isIOS && (
              <View className="cd-grow">
                <AppleAuthentication.AppleAuthenticationButton
                  buttonStyle={
                    colorScheme === 'light'
                      ? AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                      : AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
                  }
                  buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                  cornerRadius={8}
                  style={{
                    width: '100%',
                    height: 40,
                  }}
                  onPress={loginAppleMutation.mutate}
                />
              </View>
            )}
          </YStack>
          <Separator className="cd-mt-[8]" />
          <Text className="cd-text-center cd-text-gray-500 cd-leading-[24px]">
            Don't have an account?{' '}
            <Link
              className="cd-text-primary dark:cd-text-primary-dark cd-font-bold"
              href={Routes.REGISTER}
            >
              Sign up
            </Link>
          </Text>
        </YStack>
      </View>
    </DismissKeyboardHOC>
  );

  function getIcon(method: LocalAuthMethodType) {
    switch (method) {
      case 'faceId':
        return <ScanFace size={24} />;
      case 'fingerprint':
        return <Fingerprint size={24} />;
      case 'iris':
        return <ScanEye size={24} />;
      default:
        return <Fingerprint size={24} />;
    }
  }
};

export default Login;
