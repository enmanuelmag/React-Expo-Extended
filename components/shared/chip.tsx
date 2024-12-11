/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TamaguiElement, Text, View, XStack } from 'tamagui';

import { $ } from '@utils/styles';
import { Colors } from '@constants/Colors';

type ChipProps = {
  classes?: string;
  children: React.ReactNode;
  color: string;
  iconLeft?: any;
  iconRight?: any;
  onPress?: () => void;
};

const Chip = React.forwardRef<TamaguiElement, ChipProps>((props: ChipProps, ref) => {
  const { color, classes, children, iconRight, iconLeft, onPress } = props;
  return (
    <View
      backgroundColor={Colors[color as keyof typeof Colors][100]}
      className={$(
        iconLeft ? 'cd-pl-[8]' : 'cd-pl-[20]',
        iconRight ? 'cd-pr-[8]' : 'cd-pr-[20]',
        'cd-py-[4] cd-rounded-full',
        classes,
      )}
      ref={ref}
    >
      <XStack alignContent="center" alignItems="center" gap="$2" justifyContent="space-between">
        {iconLeft}
        <Text
          className="cd-font-semibold cd-text-sm"
          color={Colors[color as keyof typeof Colors][900]}
          onPress={onPress}
        >
          {children}
        </Text>
        {iconRight}
      </XStack>
    </View>
  );
});

export default Chip;
