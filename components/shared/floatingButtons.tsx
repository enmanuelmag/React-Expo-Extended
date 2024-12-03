import { $ } from '@utils/styles';
import React from 'react';
import { YStack } from 'tamagui';

type FloatingButtonsProps = {
  classes?: string;
  children: React.ReactNode;
};

const FloatingButtons = ({ classes, children }: FloatingButtonsProps) => {
  return (
    <YStack className={$('cd-absolute cd-bottom-[14] cd-right-[16]', classes)} gap="$2.5">
      {children}
    </YStack>
  );
};

export default FloatingButtons;
