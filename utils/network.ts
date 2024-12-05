/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  focusManager,
  InfiniteData,
  UseInfiniteQueryResult,
  UseQueryResult,
} from '@tanstack/react-query';
import { AppStateStatus, Platform } from 'react-native';

export function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

export const isLoadingQuery = (...results: UseQueryResult[]) => {
  return results.some((r) => r.isLoading);
};

export const isLoadingNextPageQuery = (...results: UseInfiniteQueryResult[]) => {
  return results.some((r) => r.isFetchingNextPage);
};

export const isResultOnPages = (...results: UseInfiniteQueryResult<InfiniteData<any>>[]) => {
  return results.some((r) => r.isSuccess && r.data.pages.length > 0);
};

export const flatResultPages = <T>(results: UseInfiniteQueryResult<InfiniteData<T>>) => {
  if (!results.data?.pages) return [];

  return results.data.pages.flatMap((p) => p);
};

export const isLoadingRefetchQuery = (...results: UseQueryResult[]) => {
  return results.some((r) => r.isFetching || r.isLoading);
};

export const isLoadingMutation = (...results: any[]) => {
  return results.some((r) => r.isPending && !r.isIdle);
};
