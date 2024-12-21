export const Routes = {
  // Auth (Public)
  LOGIN: '/login',
  REGISTER: '/register',
  // Private
  SEARCH: '/search',
  SETTINGS: '/settings',
} as const;

export type RoutesType = (typeof Routes)[keyof typeof Routes];
