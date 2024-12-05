import React from 'react';
import * as Burnt from 'burnt';
import { Link, router } from 'expo-router';
import { LogIn } from '@tamagui/lucide-icons';
import { View, YStack, Separator, Text } from 'tamagui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Logo from '@components/shared/logo';
import ButtonCustom from '@components/shared/button';

import { useAppStore } from '@store/index';
import { UserType } from '@customTypes/user';

import { Routes } from '@constants/routes';
import { ErrorService } from '@utils/errors';
import QKeys from '@constants/reactAPI';

import DataRepo from '@api/datasource';
import DismissKeyboardHOC from '@components/shared/dismissKeyboardHOC';

const Register = () => {
  const queryClient = useQueryClient();

  const { clear, setUser } = useAppStore();

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
        router.push(Routes.POKEDEX);
      }
    },
  });

  return (
    <DismissKeyboardHOC>
      <View className="cd-h-full cd-flex cd-justify-center cd-flex-col">
        <YStack gap="$4" padding="$6">
          <Logo classes="cd-text-4xl cd-mb-[12]" colored="Challenge" normal="RN" />

          <YStack className="cd-mt-[8]" gap="$2.5">
            <View className="cd-grow">
              <ButtonCustom
                color="google"
                iconLeft={<LogIn />}
                loading={registerGoogleMutation.isPending && !registerGoogleMutation.isIdle}
                text="Sign up with Google"
                variant="outline"
                onPress={registerGoogleMutation.mutate}
              />
            </View>
          </YStack>
          <Separator className="cd-mt-[8]" />
          <Text className="cd-text-center cd-text-gray-500 cd-leading-[24px]">
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
