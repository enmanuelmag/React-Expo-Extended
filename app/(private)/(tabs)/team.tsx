/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import * as Burnt from 'burnt';
import { X } from '@tamagui/lucide-icons';
import { Text, View, YStack } from 'tamagui';
import { Link, router, Stack, useNavigation } from 'expo-router';

import { Routes } from '@constants/routes';
import { useListState } from '@hooks/list';

import { PokemonDetailType } from '@customTypes/pokemon';

import { useAppStore } from '@store/index';

import { $ } from '@utils/styles';
import { vibration } from '@utils/haptics';
import { capitalize } from '@utils/string';

import Logo from '@components/shared/logo';
import GradientList from '@components/shared/gradientList';
import ConfirmModal from '@components/shared/confirmModal';
import ExtendedCard from '@components/pokemon/extendedCard';
import ActionIcon from '@components/shared/actionIcon';
import DismissKeyboardHOC from '@components/shared/dismissKeyboardHOC';

const Team = () => {
  const { team, setTeam } = useAppStore();

  const navigation = useNavigation();

  const [removeList, handlers] = useListState<PokemonDetailType>([]);

  const [confirmRemove, setConfirmRemove] = React.useState(false);

  React.useEffect(() => {
    if (navigation.getState().index !== 1) {
      handlers.clear();
      setConfirmRemove(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation.getState().index]);

  return (
    <DismissKeyboardHOC>
      <YStack
        className="cd-bg-white cd-h-full cd-w-full dark:cd-bg-black"
        justifyContent="space-between"
        padding="$4"
      >
        <GradientList>
          <Stack.Screen
            options={{
              headerTitle: () => <Logo colored="Team" normal="View" />,
            }}
          />
          <ConfirmModal
            closeText="Not now"
            confirmColor="red"
            confirmText="Yes, remove it"
            content={
              <React.Fragment>
                {removeList.length === 1 && (
                  <Text className="cd-text-base cd-text-gray-800 dark:cd-text-gray-200">
                    Do you want to remove this pokemon from your team
                    <Text className="cd-text-blue dark:cd-text-blue-light cd-font-semibold">
                      {' '}
                      {capitalize(removeList[0].name)}
                    </Text>
                    ?
                  </Text>
                )}
                {removeList.length > 1 && (
                  <Text className="cd-text-base cd-text-gray-800 dark:cd-text-gray-200">
                    Do you want to remove these pokemons from your team:{' '}
                    <Text className="cd-text-base cd-text-gray-800 dark:cd-text-gray-200 cd-font-semibold">
                      {removeList.map((p) => capitalize(p.name)).join(', ')}
                    </Text>
                  </Text>
                )}
              </React.Fragment>
            }
            open={confirmRemove}
            title="Remove Pokemon"
            onClose={() => {
              vibration('light');
              setConfirmRemove(false);
            }}
            onConfirm={() => {
              vibration('rigid');
              Burnt.toast({
                preset: 'done',
                title: 'Pokemon removed!',
                message: `You removed ${removeList.length} pokemon(s)`,
              });

              setTeam(team.filter((p) => !removeList.some((r) => r.id === p.id)));

              handlers.clear();
              setConfirmRemove(false);
            }}
            onOpenChange={(v) => {
              if (!v) {
                setConfirmRemove(v);
              }
            }}
          >
            <YStack className="cd-h-full" gap="$2" justifyContent="flex-start">
              {team.length === 0 && (
                <YStack className="cd-px-[32] cd-mt-[32]" gap="$4">
                  <Text className="cd-text-lg cd-text-gray-600 dark:cd-text-gray-200 cd-text-center">
                    Your team is empty
                  </Text>
                  <Text className="cd-text-base cd-text-gray-500 dark:cd-text-gray-400 cd-text-center">
                    Add pokemons to your team by catching them on the{' '}
                    <Link className="cd-text-blue-500 cd-font-semibold" href={Routes.POKEDEX}>
                      Pokedex tab
                    </Link>
                  </Text>
                </YStack>
              )}

              {team.length > 0 &&
                team.map((pokemon, index) => {
                  const idx = removeList.findIndex((p) => p.id === pokemon.id);

                  const isSelected = idx >= 0;

                  return (
                    <ExtendedCard
                      classes={$(
                        isSelected && 'cd-bg-blue-50 cd-border-blue-500 dark:cd-bg-blue-950',
                        index === team.length - 1 ? 'cd-mb-[64]' : 'cd-mb-[8]',
                      )}
                      data={pokemon}
                      key={pokemon.id}
                      onLongPress={() => {
                        if (isSelected) {
                          handlers.remove(idx);
                        } else {
                          handlers.add(pokemon);
                        }
                      }}
                      onView={() => {
                        if (removeList.length) {
                          if (isSelected) {
                            handlers.remove(idx);
                          } else {
                            handlers.add(pokemon);
                          }
                        } else {
                          vibration('light');
                          router.push(Routes.DETAIL.replace(':id', pokemon.id.toString()));
                        }
                      }}
                    />
                  );
                })}
            </YStack>
          </ConfirmModal>
        </GradientList>
      </YStack>
      {Boolean(removeList.length) && (
        <View className="cd-absolute cd-bottom-[16] cd-w-full cd-flex cd-flex-row cd-pb-[2] cd-px-[8]">
          <View
            className="cd-w-full cd-flex cd-flex-row cd-justify-between cd-items-center cd-bg-primary cd-py-[12] cd-rounded-xl cd-pr-[12] cd-pl-[16]"
            onPress={() => {
              vibration('light');
              setConfirmRemove(true);
            }}
          >
            <Text className="cd-text-white cd-text-base">
              {removeList.length} pokemon(s) seleccionados
            </Text>
            <ActionIcon
              onlyIcon
              classes="cd-my-[-6]"
              icon={<X color="white" size={22} />}
              variant="icon"
              onPress={() => {
                vibration('light');
                handlers.clear();
              }}
            />
          </View>
        </View>
      )}
    </DismissKeyboardHOC>
  );
};

export default Team;
