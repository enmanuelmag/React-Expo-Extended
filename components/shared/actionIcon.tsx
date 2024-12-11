/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleSheet } from 'react-native';

import { $ } from '@utils/styles';

import { ColorsTheme } from '@constants/Colors';

import ButtonCustom from './button';

type ActionIconProps = {
  classes?: string;
  loading?: boolean;
  disabled?: boolean;
  icon: React.ReactElement | any;
  color?: keyof (typeof ColorsTheme)['light'];
  variant?: 'default' | 'filled' | 'outline' | 'transparent' | 'icon';
  onPress?: (e: any) => void;
  onlyIcon?: boolean;
  size?: number;
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' | 'auto';
};

const ActionIcon = React.forwardRef((props: ActionIconProps, ref) => {
  const { onlyIcon, loading, color, onPress, icon, variant, classes, alignSelf, size, disabled } =
    props;

  return (
    <ButtonCustom
      isActionIcon
      alignSelf={alignSelf}
      classes={$('cd-font-[500] !cd-text-white]', classes)}
      color={color}
      disabled={disabled}
      iconLeft={icon}
      loading={loading}
      onlyIcon={onlyIcon}
      ref={ref}
      size={size}
      style={onlyIcon ? undefined : styles.boxShadow}
      variant={variant}
      onPress={onPress}
    />
  );
});

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.25,

    elevation: 3,
  },
});

export default ActionIcon;
