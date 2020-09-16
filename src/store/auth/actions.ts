import { Profile } from './types';
import { typedAction } from '../helpers';

const setIsAuthenticated = (isAuthenticated: boolean) => {
  return typedAction(
    'auth.isAuthenticated.set',
    isAuthenticated
  );
};

const setAuthenticatedUser = (profile: Profile) => {
  return typedAction(
    'auth.authenticatedUser.set',
    profile
  );
};

export type AuthActions = ReturnType<
  typeof setIsAuthenticated
  | typeof setAuthenticatedUser
>
