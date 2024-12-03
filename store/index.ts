import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { UserType } from '@customTypes/user';

type ThemeOptions = 'light' | 'dark' | string;

type UserSlice = {
  //states
  user: UserType | null;
  theme: ThemeOptions;
  usedSystemTheme: boolean;
};

type UserSliceActions = {
  //actions
  clear: () => void;
  setUser: (user?: UserType | null) => void;
  setTheme: (theme: ThemeOptions) => void;
  setUsedSystemTheme: (usedSystemTheme: boolean) => void;
};

const initialUserSlice: UserSlice = {
  user: null,
  theme: 'light',
  usedSystemTheme: false,
};

export const useAppStore = create(
  persist<UserSlice & UserSliceActions>(
    (set) => ({
      ...initialUserSlice,
      //actions
      clear: () => set(initialUserSlice),
      setUser: (user) => set({ user }),
      setTheme: (theme) => set({ theme }),
      setUsedSystemTheme: (usedSystemTheme) => set({ usedSystemTheme }),
    }),
    {
      version: 1,
      name: 'app-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
