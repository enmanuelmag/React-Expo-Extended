/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { XStack } from 'tamagui';

type TextIconProps = {
  text: React.ReactNode;
  icon: any;
  iconRight?: any;
  gap?: string;
  classes?: string;
};

const TextIcon = (props: TextIconProps) => {
  const { text, icon, iconRight, gap, classes } = props;
  return (
    <XStack
      alignContent="center"
      alignItems="center"
      className={classes}
      gap={gap || '$1'}
      justifyContent="flex-start"
    >
      {icon}
      {text}
      {iconRight}
    </XStack>
  );
};

export default TextIcon;
