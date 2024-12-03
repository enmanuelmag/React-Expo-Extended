/* eslint-disable @typescript-eslint/no-explicit-any */
export const $ = (...args: any[]) => args.filter(Boolean).join(' ');

export const getBgColor = (colorScheme: 'light' | 'dark') => {
  return colorScheme === 'light' ? '#FFF' : '#000';
};
