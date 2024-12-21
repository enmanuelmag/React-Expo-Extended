import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { UserType } from '@customTypes/user';
import { PokemonDetailType } from '@customTypes/pokemon';
import { NotificationForegroundType } from '@customTypes/notification';

import { RoutesType } from '@constants/routes';

type ThemeOptions = 'light' | 'dark' | string;

type UserSlice = {
  //states
  tabSelected: RoutesType;
  user: UserType | null;
  theme: ThemeOptions;
  usedSystemTheme: boolean;
  pushToken?: string | null;
  popOverNotification?: NotificationForegroundType | null;
};

type UserSliceActions = {
  //actions
  clear: () => void;
  setUser: (user?: UserType | null) => void;
  setTheme: (theme: ThemeOptions) => void;
  setUsedSystemTheme: (usedSystemTheme: boolean) => void;
  setTabSelected: (tabSelected: UserSlice['tabSelected']) => void;
  setPushToken: (pushToken: string | null) => void;
  setPopOverNotification: (popOverNotification: NotificationForegroundType | null) => void;
};

type TeamSlice = {
  //states
  team: PokemonDetailType[];
};

type TeamSliceActions = {
  //actions
  clear: () => void;
  addPokemon: (pokemon: PokemonDetailType) => void;
  removePokemon: (pokemon: PokemonDetailType) => void;
  setTeam: (team: PokemonDetailType[]) => void;
};

const initialUserSlice: UserSlice = {
  user: null,
  theme: 'light',
  tabSelected: '/search',
  usedSystemTheme: false,
  pushToken: null,
  popOverNotification: null,
};

const initialTeamSlice: TeamSlice = {
  team: [],
};

export const useAppStore = create(
  persist<UserSlice & UserSliceActions & TeamSlice & TeamSliceActions>(
    (set) => ({
      ...initialUserSlice,
      ...initialTeamSlice,
      //UserSlice Actions
      clear: () => set({ ...initialUserSlice, ...initialTeamSlice }),
      setUser: (user) => set({ user }),
      setTheme: (theme) => set({ theme }),
      setUsedSystemTheme: (usedSystemTheme) => set({ usedSystemTheme }),
      setTabSelected: (tabSelected) => set({ tabSelected }),
      setPushToken: (pushToken) => set({ pushToken }),
      setPopOverNotification: (popOverNotification) => set({ popOverNotification }),
      //TeamSlice Actions
      addPokemon: (pokemon) => set((state) => ({ team: [pokemon, ...state.team] })),
      removePokemon: (pokemon) =>
        set((state) => ({ team: state.team.filter((p) => p.id !== pokemon.id) })),
      setTeam: (team) => set({ team }),
    }),
    {
      version: 3,
      name: 'app-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
