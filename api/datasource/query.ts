import { CACHED_TIME } from '@constants/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  mutationCache: new MutationCache(),
});

queryClient.setDefaultOptions({
  queries: {
    retry: 2,
    gcTime: CACHED_TIME,
    networkMode: 'always',
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  },
  mutations: {
    retry: 2,
    gcTime: 0,
    networkMode: 'always',
  },
});

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

export default queryClient;
