/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import * as Burnt from 'burnt';
import { Link, router } from 'expo-router';
import { LogIn } from '@tamagui/lucide-icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View, YStack, Separator, Text } from 'tamagui';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { RegisterSchema, RegisterType } from '@customTypes/auth';

import Logo from '@components/shared/logo';
import InputText from '@components/shared/inputText';
import ButtonCustom from '@components/shared/button';

import { useAppStore } from '@store/index';
import { UserType } from '@customTypes/user';

import { Routes } from '@constants/routes';
import { ErrorService } from '@utils/errors';
import QKeys from '@constants/reactAPI';

import DataRepo from '@api/datasource';
import DismissKeyboardHOC from '@components/shared/dismissKeyboardHOC';
import { isIOS } from '@utils/platform';
import { useColorScheme } from 'nativewind';

const Register = () => {
  const queryClient = useQueryClient();

  const { colorScheme } = useColorScheme();

  const { clear, setUser } = useAppStore();

  const registerMutation = useMutation<UserType, ErrorService, RegisterType>({
    networkMode: 'always',
    mutationKey: [QKeys.REGISTER_KEY],
    mutationFn: async (data) => {
      const response = await DataRepo.signUpWithEmailAndPassword(data.email, data.password);
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

  const registerGoogleMutation = useMutation<UserType, ErrorService>({
    networkMode: 'always',
    mutationKey: [QKeys.REGISTER_GOOGLE_KEY],
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      withGoogle: false,
    },
    resolver: zodResolver(RegisterSchema),
  });

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
                autoComplete="new-password"
                error={errors.password?.message}
                label="Password"
                placeholder="**********"
                textContentType="newPassword"
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <InputText
                isPassword
                autoCapitalize="none"
                autoComplete="new-password"
                error={errors.password?.message}
                label="Confirm password"
                placeholder="**********"
                textContentType="newPassword"
                {...field}
              />
            )}
          />

          <ButtonCustom
            disabled={
              (registerMutation.isPending && !registerMutation.isIdle) ||
              (registerGoogleMutation.isPending && !registerGoogleMutation.isIdle)
            }
            loading={registerMutation.isPending && !registerMutation.isIdle}
            text="Sign up with Email"
            variant="primary"
            onPress={handleSubmit((data) => registerMutation.mutate(data))}
          />
          <YStack className="cd-mt-[8]" gap="$2.5">
            <View className="cd-grow">
              <ButtonCustom
                color="google"
                disabled={registerGoogleMutation.isPending && !registerGoogleMutation.isIdle}
                iconLeft={<LogIn />}
                loading={registerGoogleMutation.isPending && !registerGoogleMutation.isIdle}
                text="Sign up with Google"
                variant="outline"
                onPress={registerGoogleMutation.mutate}
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
                  buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP}
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
          <Text className="cd-text-center cd-text-gray-500">
            Already have an account?{' '}
            <Link
              className="cd-text-primary dark:cd-text-primary-dark cd-font-bold"
              href={Routes.LOGIN}
            >
              Sign in
            </Link>
          </Text>
        </YStack>
      </View>
    </DismissKeyboardHOC>
  );
};

export default Register;
