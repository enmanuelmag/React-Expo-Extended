import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserSlice = {
  //states
  name: string;
  //actions
};

const initialUserSlice = {
  name: '',
};

export const useAppStore = create(
  persist<UserSlice>(
    (set) => ({
      ...initialUserSlice,
      clear: () => set({ ...initialUserSlice }),
    }),
    {
      version: 1,
      name: 'form-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
