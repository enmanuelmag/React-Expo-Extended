/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

import { Colors, ColorsTheme } from '@constants/Colors';

export function useThemeColor(
  colorName: keyof typeof ColorsTheme.light & keyof typeof ColorsTheme.dark,
) {
  const theme = useColorScheme() ?? 'light';
  return ColorsTheme[theme][colorName];
}

export function getColorsFromWind(color?: string) {
  if (!color) return color;

  const items = color.split('-');

  const colorName = items.at(-2);
  const colorStrength = items.at(-1);

  if (colorStrength === 'app') {
    return '#8b5cf6';
  }

  const variants = Colors[colorName as keyof typeof Colors];
  return variants[colorStrength as keyof typeof variants];
}
