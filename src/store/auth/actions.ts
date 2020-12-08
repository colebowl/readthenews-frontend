import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Auth } from '../../shared/amplify';
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

const setUserSignedOut = () => {
  return typedAction(
    'auth.signOut',
  );
};

export type AuthActions = ReturnType<
  typeof setIsAuthenticated
  | typeof setAuthenticatedUser
  | typeof setUserSignedOut
>

const signOut = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    await Auth.signOut();
    dispatch(setUserSignedOut());
  }
};



const AuthState = {
  actions: {
    signOut,
  }
}

export default AuthState;
