import { formatNumber } from 'react-native-currency-input';

export const capitalize = (s: string, onlyFirst = false) => {
  if (onlyFirst) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  return s
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function formatCurrency(amount: number, symbol: string, precision = 2) {
  return formatNumber(amount, { prefix: symbol, precision });
}

export function formatCurrencyLabel(amount: number, symbol: string) {
  if (amount < 1e3) {
    return formatCurrency(amount, symbol, 0);
  } else if (amount < 1e6) {
    return formatCurrency(amount / 1e3, symbol, 0) + 'K';
  } else if (amount < 1e9) {
    return formatCurrency(amount / 1e6, symbol, 0) + 'M';
  } else if (amount < 1e12) {
    return formatCurrency(amount / 1e9, symbol, 0) + 'B';
  } else {
    return formatCurrency(amount / 1e12, symbol, 0) + 'T';
  }
}

export const cleanNumber = (value: string) => {
  return value.replace(/[^0-9.]/g, '');
};
