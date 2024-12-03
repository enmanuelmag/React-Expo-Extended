import { $ } from '@utils/styles';
import React from 'react';
import { useColorScheme } from 'nativewind';

import { Text as TextTamagui } from 'tamagui';

const ColorDark = {
  100: 900,
  200: 800,
  300: 700,
  400: 600,
  500: 400,
  600: 400,
  700: 300,
  800: 100,
  900: 100,
};

type TextProps = {
  children: string | number | React.ReactNode;
  color?: string;
  intensity?: number;
  classes?: string;
};

const Text = (props: TextProps) => {
  const { colorScheme } = useColorScheme();
  const { classes, children, intensity = 800, color = 'gray' } = props;

  const lightText = `cd-text-${color}-${intensity}`;

  const darkText = `dark:cd-text-${color}-${ColorDark[intensity as keyof typeof ColorDark]}`;

  return (
    <TextTamagui className={$(colorScheme === 'light' ? lightText : darkText, classes)}>
      {children}
    </TextTamagui>
  );
};

export default Text;
