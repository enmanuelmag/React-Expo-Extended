import React from 'react';
import { Card, Text, XStack } from 'tamagui';

import { PokemonBaseType } from '@customTypes/pokemon';

import { $ } from '@utils/styles';
import { capitalize } from '@utils/string';

type BaseCardProps = {
  classes?: string;
  onView?: () => void;
  data: PokemonBaseType;
};

const BaseCard = (props: BaseCardProps) => {
  const { data, classes, onView } = props;

  const { name } = data;

  return (
    <Card
      bordered
      className={$('cd-rounded-lg cd-bg-white dark:cd-bg-zinc-900', classes)}
      size="$2"
      onPress={(e) => {
        e.preventDefault();
        onView?.();
      }}
    >
      <Card.Header className="cd-px-[16] cd-py-[8]">
        <XStack alignContent="center" alignItems="center" justifyContent="space-between">
          <Text className="cd-text-base cd-text-gray-800 dark:cd-text-gray-200">
            {capitalize(name)}
          </Text>
        </XStack>
      </Card.Header>
    </Card>
  );
};

export default BaseCard;
