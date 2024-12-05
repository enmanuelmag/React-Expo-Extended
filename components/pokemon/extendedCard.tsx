import React from 'react';
import { Image } from 'expo-image';
import { Card, Text, XStack, YStack } from 'tamagui';

import { PokemonDetailType } from '@customTypes/pokemon';

import { blurhash } from '@constants/image';

import { $ } from '@utils/styles';
import { capitalize } from '@utils/string';

type ExtendedCardProps = {
  classes?: string;
  onView?: () => void;
  onLongPress?: () => void;
  data: PokemonDetailType;
};

const ExtendedCard = (props: ExtendedCardProps) => {
  const { data, classes, onView, onLongPress } = props;

  const { name, sprites, id } = data;

  return (
    <Card
      bordered
      className={$('cd-rounded-lg cd-bg-white dark:cd-bg-zinc-900', classes)}
      size="$2"
      onLongPress={(e) => {
        e.preventDefault();
        onLongPress?.();
      }}
      onPress={(e) => {
        e.preventDefault();
        onView?.();
      }}
    >
      <Card.Header className="cd-px-[16] cd-py-[8]">
        <XStack alignContent="center" alignItems="center" justifyContent="space-between">
          <YStack>
            <Text className="cd-text-base cd-text-gray-800 dark:cd-text-gray-200">
              {capitalize(name)}
            </Text>
            <Text className="cd-text-base cd-text-gray-500 dark:cd-text-gray-400">
              Pokedex ID: {id}
            </Text>
          </YStack>

          {sprites?.front_default && (
            <Image
              className="cd-w-[80] cd-h-[80]"
              contentFit="contain"
              placeholder={{ blurhash }}
              source={{ uri: data?.sprites.front_default }}
              transition={750}
            />
          )}
        </XStack>
      </Card.Header>
    </Card>
  );
};

export default ExtendedCard;
