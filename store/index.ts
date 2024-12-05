import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { UserType } from '@customTypes/user';
import { PokemonDetailType } from '@customTypes/pokemon';
import { NotificationForegroundType } from '@customTypes/notification';

type ThemeOptions = 'light' | 'dark' | string;

type UserSlice = {
  //states
  tabSelected: 'pokedex' | 'team' | 'settings';
  user: UserType | null;
  theme: ThemeOptions;
  usedSystemTheme: boolean;
  popOverNotification?: NotificationForegroundType | null;
};

type UserSliceActions = {
  //actions
  clear: () => void;
  setUser: (user?: UserType | null) => void;
  setTheme: (theme: ThemeOptions) => void;
  setUsedSystemTheme: (usedSystemTheme: boolean) => void;
  setTabSelected: (tabSelected: UserSlice['tabSelected']) => void;
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
  tabSelected: 'pokedex',
  usedSystemTheme: false,
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
      setPopOverNotification: (popOverNotification) => set({ popOverNotification }),
      //TeamSlice Actions
      addPokemon: (pokemon) => set((state) => ({ team: [pokemon, ...state.team] })),
      removePokemon: (pokemon) =>
        set((state) => ({ team: state.team.filter((p) => p.id !== pokemon.id) })),
      setTeam: (team) => set({ team }),
    }),
    {
      version: 2,
      name: 'app-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
