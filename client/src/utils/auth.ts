import type { AuthUser } from '../types/auth';

import { storage } from './storage';

export const loginSession = (
  token: string,
  user: AuthUser,
): void => {
  storage.setToken(token);
  storage.setUser(user);
};

export const logout = (): void => {
  storage.clear();
};

export const isAuthenticated = (): boolean => {
  return Boolean(storage.getToken());
};

export const getCurrentUser =
  (): AuthUser | null => {
    return storage.getUser<AuthUser>();
  };