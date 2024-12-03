/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button, Circle, View } from 'tamagui';

import { $ } from '@utils/styles';
import Loader from './loader';
import { UI } from '@constants/app';
import { useColorScheme } from 'nativewind';

export const variantStyles = {
  default: 'cd-font-[500]',
  // Buttons with text
  primary: '!cd-bg-primary !cd-text-white',
  light: '!cd-bg-primary-light !cd-text-primary',
  secondary: '!cd-bg-gray-500 !cd-text-white',
  transparent: '!cd-bg-transparent !cd-text-primary',
  outline: '!cd-border !cd-border-primary !cd-bg-transparent !cd-text-primary',
  outlineLight: '!cd-border !cd-border-primary-light !cd-bg-transparent !cd-text-primary',
  // Icon buttons
  icon: '!cd-bg-transparent !cd-text-primary !cd-p-0 !cd-m-0 !cd-text-gray-800',
  iconPrimary: '!cd-bg-primary !cd-text-white !cd-rounded-full !cd-px-[16] !cd-py-[28]',
  iconRound: '!cd-px-[16] !cd-py-[28] !cd-text-white !cd-rounded-full',
  //disabled
  disabled: '!cd-bg-gray-200 !cd-text-gray-400 !cd-cursor-not-allowed !cd-border-gray-200',
  disabledDark: '!cd-bg-zinc-800 !cd-text-gray-400 !cd-cursor-not-allowed !cd-border-zinc-800',
  //auth
  //make a variant for auth, squared with a border radius of 8px
  auth: '!cd-bg-primary !cd-text-white !cd-rounded-lg !cd-p-[0] !cd-m-[0]',
};

export const colorsStyles = {
  red: '!cd-bg-red-500 !cd-text-white !cd-border-red-500',
  redDark: '!cd-bg-red-600 !cd-text-white !cd-border-red-700',
  green: '!cd-bg-green-500 !cd-text-white !cd-border-green-500',
  greenDark: '!cd-bg-green-700 !cd-text-white !cd-border-green-700',
  gray: '!cd-bg-gray-500 !cd-text-white !cd-border-gray-500',
  grayDark: '!cd-bg-gray-700 !cd-text-white !cd-border-gray-700',
  orange: '!cd-bg-orange-500 !cd-text-white !cd-border-orange-500',
  orangeDark: '!cd-bg-orange-700 !cd-text-white !cd-border-orange-700',
  violet: '!cd-bg-violet-500 !cd-text-white !cd-border-violet-500',
  violetDark: '!cd-bg-violet-700 !cd-text-white !cd-border-violet-700',
  blue: '!cd-bg-primary !cd-text-white !cd-border-primary',
  blueDark: '!cd-bg-primary-dark !cd-text-white !cd-border-primary-dark',
  yellow: '!cd-bg-yellow-500 !cd-text-white !cd-border-yellow-500',
  yellowDark: '!cd-bg-yellow-700 !cd-text-white !cd-border-yellow-700',
  primary: '!cd-bg-primary !cd-text-white !cd-border-primary',
  primaryDark: '!cd-bg-primary-dark !cd-text-white !cd-border-primary-dark',
  google: '!cd-text-[#4285f4] !cd-border-[#4285f4]', //!cd-bg-[#4285f4]
  googleDark: '!cd-text-[#4285f4] !cd-border-[#4285f4]', //!cd-bg-[#4285f4]
};

type ButtonCustomProps = {
  text?: string;
  disabled?: boolean;
  color?: keyof typeof colorsStyles;
  variant?: keyof typeof variantStyles;
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
    variant = 'primary',
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

  const color = colorScheme === 'light' ? c : (`${c}Dark` as keyof typeof colorsStyles);

  if (isActionIcon && !onlyIcon) {
    return (
      <Circle
        alignSelf="center"
        className={$(
          variantStyles.default,
          variant && variantStyles[variant],
          color && colorsStyles[color],
          classes,
          disabled &&
            (colorScheme === 'light' ? variantStyles.disabled : variantStyles.disabledDark),
        )}
        ref={ref}
        size={size || 55}
        style={style}
        onPress={disabled || loading ? undefined : onPress}
      >
        {loading ? (
          <Loader color={color || variant !== 'default' ? 'white' : undefined} />
        ) : (
          iconLeft
        )}
      </Circle>
    );
  }

  if (onlyIcon) {
    return (
      <View
        alignSelf={alignSelf}
        className={$(
          variantStyles.default,
          variant && variantStyles[variant],
          color && colorsStyles[color],
          'cd-py-[8] cd-my-[4] cd-px-[4]',
          classes,
          disabled &&
            (colorScheme === 'light' ? variantStyles.disabled : variantStyles.disabledDark),
        )}
        ref={ref}
        onPress={disabled ? undefined : onPress}
      >
        {iconLeft || iconRight}
      </View>
    );
  }

  return (
    <Button
      alignSelf={alignSelf}
      className={$(
        variantStyles.default,
        variant && variantStyles[variant],
        color && colorsStyles[color],
        classes,
        disabled && (colorScheme === 'light' ? variantStyles.disabled : variantStyles.disabledDark),
      )}
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
});

export default ButtonCustom;
