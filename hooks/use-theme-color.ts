/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

import { ColorsTheme } from '@constants/Colors';

export function useThemeColor(
  colorName: keyof typeof ColorsTheme.light & keyof typeof ColorsTheme.dark,
) {
  const theme = useColorScheme() ?? 'light';
  return ColorsTheme[theme][colorName];
}
