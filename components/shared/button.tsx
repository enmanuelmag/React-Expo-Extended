/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useColorScheme } from 'nativewind';
import { Button, Circle } from 'tamagui';

import { UI } from '@constants/app';
import { ColorsTheme } from '@constants/Colors';

import { useThemeColor } from '@hooks/useThemeColor';

import { $ } from '@utils/styles';

import Loader from './loader';

const disabledStyles =
  '!cd-bg-gray-200 !cd-text-gray-400 !cd-cursor-not-allowed !cd-border-gray-200';

const disabledDarkStyles =
  '!cd-bg-zinc-800 !cd-text-gray-400 !cd-cursor-not-allowed !cd-border-zinc-800';

type ButtonCustomProps = {
  text?: string;
  disabled?: boolean;
  color?: keyof (typeof ColorsTheme)['light'];
  variant?: 'default' | 'filled' | 'outline' | 'transparent' | 'icon';
  iconLeft?: any;
  iconRight?: any;
  classes?: string;
  loading?: boolean;
  isActionIcon?: boolean;
  onlyIcon?: boolean;
  style?: any;
  size?: number;
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' | 'auto';
  onPress?: (e: any) => void;
};

const ButtonCustom = React.forwardRef<any, ButtonCustomProps>((props: ButtonCustomProps, ref) => {
  const {
    alignSelf,
    disabled,
    text,
    variant = 'filled',
    isActionIcon,
    iconLeft,
    iconRight,
    loading,
    color: c,
    onlyIcon,
    classes,
    onPress,
    size,
    style,
  } = props;

  const { colorScheme } = useColorScheme();

  const buttonColors = useThemeColor(c ?? 'app');

  const colorsStyles = getColorsStyles();

  if (isActionIcon && !onlyIcon) {
    return (
      <Circle
        alignSelf="center"
        className={$(colorsStyles, classes)}
        ref={ref}
        size={size || 55}
        style={style}
        onPress={disabled || loading ? undefined : onPress}
      >
        {loading ? (
          <Loader color={variant === 'filled' || variant === 'default' ? 'white' : undefined} />
        ) : (
          React.cloneElement(iconLeft, {
            color: buttonColors.text.split('-')[2],
          })
        )}
      </Circle>
    );
  }

  if (onlyIcon) {
    return (
      <Button
        alignSelf={alignSelf}
        className={$(colorsStyles, 'cd-py-[0] cd-my-[0] cd-px-[0]', classes)}
        disabled={disabled}
        height="auto"
        icon={loading ? <Loader /> : iconLeft || iconRight}
        margin={0}
        padding={0}
        ref={ref}
        size={UI.Size}
        onPress={disabled ? undefined : onPress}
      />
    );
  }

  return (
    <Button
      alignSelf={alignSelf}
      className={$(colorsStyles, classes)}
      disabled={disabled}
      icon={loading ? <Loader /> : iconLeft}
      iconAfter={iconRight}
      ref={ref}
      size={UI.Size}
      onPress={disabled ? undefined : onPress}
    >
      {loading && isActionIcon ? undefined : text}
    </Button>
  );

  function getColorsStyles() {
    const styles: string[] = ['cd-font-[500]'];

    if (disabled) {
      styles.push(colorScheme === 'light' ? disabledStyles : disabledDarkStyles);

      return styles.join(' ');
    }

    if (variant === 'default' || variant === 'filled') {
      styles.push(buttonColors.bg, buttonColors.text);
    } else if (variant === 'outline') {
      styles.push(buttonColors.border, buttonColors.textColored, 'cd-bg-transparent');
    } else if (variant === 'transparent') {
      styles.push(buttonColors.text, 'cd-bg-transparent', 'cd-border-transparent');
    } else if (variant === 'icon') {
      if (onlyIcon) {
        styles.push(buttonColors.textColored, 'cd-bg-transparent');
      } else {
        styles.push(buttonColors.bg, buttonColors.text);
      }
      //styles.push('!cd-bg-transparent !cd-text-app !cd-p-0 !cd-m-0 !cd-text-gray-800');
      styles.push('!cd-p-0 !cd-m-0');
    } else {
      styles.push(buttonColors.bg, buttonColors.text);
    }

    return styles.join(' ');
  }
});

export default ButtonCustom;
