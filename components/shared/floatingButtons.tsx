import React from 'react';
import { YStack } from 'tamagui';
import { Keyboard } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { $ } from '@utils/styles';

type FloatingButtonsProps = {
  classes?: string;
  children: React.ReactNode;
};

const FloatingButtons = ({ classes, children }: FloatingButtonsProps) => {
  const [keyboardStatus, setKeyboardStatus] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardStatus(true);
      });
      const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardStatus(false);
      });
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []),
  );
  return (
    <YStack
      className={$(
        'cd-absolute cd-right-[16] cd-bottom-[14] cd-transition-transform cd-duration-500 cd-ease-in-out cd-transform cd-translate-y-0',
        keyboardStatus && '-cd-translate-y-2',
        classes,
      )}
      gap="$2.5"
    >
      {children}
    </YStack>
  );
};

export default FloatingButtons;
