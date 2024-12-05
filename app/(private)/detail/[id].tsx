/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import * as Burnt from 'burnt';
import { Image } from 'expo-image';
import { Plus } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { Separator, Text, View, XStack, YStack } from 'tamagui';
import { Stack, useLocalSearchParams } from 'expo-router';

import DataRepo from '@api/datasource';

import { useAppStore } from '@store/index';

import { PokemonDetailType } from '@customTypes/pokemon';

import QKeys from '@constants/reactAPI';
import { blurhash } from '@constants/image';

import { capitalize } from '@utils/string';
import { ErrorService } from '@utils/errors';
import { isLoadingRefetchQuery } from '@utils/network';

import Logo from '@components/shared/logo';
import LoaderText from '@components/shared/loaderText';
import ActionIcon from '@components/shared/actionIcon';
import ConfirmModal from '@components/shared/confirmModal';
import GradientList from '@components/shared/gradientList';
import PageViewerCustom from '@components/shared/pageViewer';
import FloatingButtons from '@components/shared/floatingButtons';
import DismissKeyboardHOC from '@components/shared/dismissKeyboardHOC';

const DetailScreen = () => {
  const { addPokemon, team } = useAppStore();

  const { id } = useLocalSearchParams<{ id: string }>();

  const [confirmCatch, setConfirmCatch] = React.useState(false);

  const pokemonDetailQuery = useQuery<PokemonDetailType, ErrorService, PokemonDetailType, string[]>(
    {
      enabled: !!id,
      queryKey: [QKeys.GET_POKEMON_DETAIL_KEY, id],
      queryFn: async ({ queryKey }) => {
        const [, idParam] = queryKey;
        const budget = await DataRepo.getPokemonDetail({ id: idParam });
        return budget;
      },
    },
  );

  if (isLoadingRefetchQuery(pokemonDetailQuery)) {
    return (
      <View className="cd-h-full cd-flex cd-flex-col cd-justify-center">
        <Stack.Screen
          options={{
            headerTitle: () => <Logo colored="Detail" normal="Poke" />,
          }}
        />
        <LoaderText text="Loading pokemon" />
      </View>
    );
  }

  const { data } = pokemonDetailQuery;

  return (
    <DismissKeyboardHOC>
      <ConfirmModal
        closeText="Not now"
        confirmColor="green"
        confirmText="Catch it!"
        content={
          <Text className="cd-text-base cd-text-gray-800 dark:cd-text-gray-200">
            Do you want to catch
            <Text className="cd-text-blue dark:cd-text-blue-light cd-font-semibold">
              {' '}
              {capitalize(data?.name)}
            </Text>
            ?
          </Text>
        }
        open={confirmCatch}
        title="Catch Pokemon"
        onConfirm={() => {
          Burnt.toast({
            preset: 'done',
            title: 'Pokemon caught!',
            message: `You caught ${capitalize(data?.name)}!`,
          });

          addPokemon(data!);

          setConfirmCatch(false);
        }}
        onOpenChange={(v) => {
          if (!v) {
            setConfirmCatch(v);
          }
        }}
      >
        <React.Fragment>
          <Stack.Screen
            options={{
              headerTitle: () => <Logo colored="Detail" normal="Poke" />,
            }}
          />
          <GradientList>
            <YStack className="cd-h-full" gap="$3" padding="$3">
              <XStack className="cd-flex cd-flex-row cd-flex-wrap" justifyContent="space-between">
                <YStack className="cd-basis-[60%]" gap="$1">
                  <Text className="cd-text-gray-900 cd-text-xl cd-font-bold dark:cd-text-gray-100 cd-mb-[8]">
                    {capitalize(data?.name)}
                  </Text>
                  <Text className="cd-text-base cd-text-gray-500 dark:cd-text-gray-400">
                    Types: {data?.types.map((t) => capitalize(t.type.name)).join(', ')}
                  </Text>
                  <Text className="cd-text-base cd-text-gray-500 dark:cd-text-gray-400">
                    Height: {data?.height}, Weight: {data?.weight}
                  </Text>
                </YStack>
                {data?.sprites.front_default && (
                  <View className="cd-relative cd-basis-[40%] cd-flex cd-justify-center cd-items-center">
                    <Image
                      className="cd-h-[92] cd-w-full"
                      contentFit="contain"
                      placeholder={{ blurhash }}
                      source={{ uri: data?.sprites.front_default }}
                      transition={750}
                    />
                  </View>
                )}
              </XStack>

              <Separator className="cd-mt-[8]" />

              <YStack gap="$1">
                <Text className="cd-text-base cd-text-gray-800 dark:cd-text-gray-300 cd-font-semibold">
                  Abilities
                </Text>
                {data?.abilities.map((a) => (
                  <Text
                    className="cd-text-base cd-text-gray-500 dark:cd-text-gray-400"
                    key={a.ability.name}
                  >
                    {capitalize(a.ability.name)}
                  </Text>
                ))}
              </YStack>

              <Separator className="cd-mt-[8]" />

              <YStack gap="$1">
                <Text className="cd-text-base cd-text-gray-800 dark:cd-text-gray-300 cd-font-semibold">
                  Stats
                </Text>
                {data?.stats.map((s) => (
                  <Text
                    className="cd-text-base cd-text-gray-500 dark:cd-text-gray-400"
                    key={s.stat.name}
                  >
                    {capitalize(s.stat.name)}: {s.base_stat}
                  </Text>
                ))}
              </YStack>

              <Separator className="cd-mt-[8]" />

              <YStack gap="$1">
                <Text className="cd-text-base cd-text-gray-800 dark:cd-text-gray-300 cd-font-semibold">
                  Sprites
                </Text>

                <PageViewerCustom
                  items={[
                    data?.sprites.front_shiny,
                    data?.sprites.back_shiny,
                    data?.sprites.front_female,
                    data?.sprites.back_default,
                  ]
                    .filter(Boolean)
                    .map((url) => (
                      <Image
                        className="cd-w-[128] cd-h-[128] cd-basis-1/2"
                        contentFit="contain"
                        placeholder={{ blurhash }}
                        source={{ uri: url! }}
                        transition={750}
                      />
                    ))}
                />
              </YStack>
            </YStack>
          </GradientList>
          <FloatingButtons key="floating-budget">
            <ActionIcon
              color="blue"
              disabled={team.some((p) => p.id === data?.id)}
              icon={<Plus color="white" size={22} />}
              variant="primary"
              onPress={() => {
                setConfirmCatch(true);
              }}
            />
          </FloatingButtons>
        </React.Fragment>
      </ConfirmModal>
    </DismissKeyboardHOC>
  );
};

export default DetailScreen;
