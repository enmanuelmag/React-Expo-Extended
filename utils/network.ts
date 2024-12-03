/* eslint-disable @typescript-eslint/no-explicit-any */
import { focusManager, UseQueryResult } from '@tanstack/react-query';
import { AppStateStatus, Platform } from 'react-native';

export function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

export const isLoadingQuery = (...results: UseQueryResult[]) => {
  return results.some((r) => r.isLoading);
};

export const isLoadingRefetchQuery = (...results: UseQueryResult[]) => {
  return results.some((r) => r.isFetching || r.isLoading);
};

export const isLoadingMutation = (...results: any[]) => {
  return results.some((r) => r.isPending && !r.isIdle);
};
