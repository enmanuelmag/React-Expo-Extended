import React from 'react';
import { router } from 'expo-router';
import { View, YStack } from 'tamagui';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import QKeys from '@constants/reactAPI';

import DataRepo from '@api/datasource';

import { Routes } from '@constants/routes';

import { PokemonApiResponse, PokemonBaseType } from '@customTypes/pokemon';

import { ErrorService } from '@utils/errors';
import { parseId, parseOffset } from '@utils/pokemon';
import { isLoadingNextPageQuery, isLoadingQuery } from '@utils/network';

import BaseCard from '@components/pokemon/baseCard';
import LoaderText from '@components/shared/loaderText';
import FlatGradientList from '@components/shared/flatGradientList';
import { vibration } from '@utils/haptics';

type PageType = {
  offset: number;
  limit: number;
};

const CatchTeam = () => {
  const pokemonsBaseQuery = useInfiniteQuery<
    PokemonApiResponse,
    ErrorService,
    InfiniteData<PokemonApiResponse>,
    string[],
    PageType
  >({
    queryKey: [QKeys.GET_POKEMONS_BASE_KEY],
    initialPageParam: {
      offset: 0,
      limit: 20,
    },
    getNextPageParam: (lastPage) => parseOffset(lastPage.next),
    queryFn: ({ pageParam }) =>
      DataRepo.getPokemonsBase({
        offset: pageParam.offset ?? 0,
        limit: pageParam.limit ?? 10,
      }),
  });

  const items = pokemonsBaseQuery?.data?.pages.flatMap((p) => p.results) ?? [];

  return (
    <YStack
      className="cd-bg-white cd-h-full cd-w-full dark:cd-bg-black"
      justifyContent="space-between"
      padding="$4"
    >
      {isLoadingQuery(pokemonsBaseQuery) && (
        <View className="cd-h-full cd-flex cd-flex-col cd-justify-center">
          <LoaderText text="Loading budgets" />
        </View>
      )}

      {pokemonsBaseQuery.isSuccess && (
        <YStack className="cd-h-full" gap="$2" justifyContent="flex-start">
          <FlatGradientList<PokemonBaseType>
            isLoadingNextPage={isLoadingNextPageQuery(pokemonsBaseQuery)}
            isRefetching={isLoadingNextPageQuery(pokemonsBaseQuery)}
            items={items}
            refetch={() => {
              pokemonsBaseQuery.refetch();
            }}
            renderItem={({ item, index }) => (
              <BaseCard
                classes={index === items.length - 1 ? 'cd-mb-[64]' : 'cd-mb-[8]'}
                data={item}
                key={index}
                onView={() => {
                  vibration('light');
                  router.push(Routes.DETAIL.replace(':id', parseId(item.url)));
                }}
              />
            )}
            onEndReached={() => {
              pokemonsBaseQuery.fetchNextPage();
            }}
          />
        </YStack>
      )}
    </YStack>
  );
};

export default CatchTeam;
