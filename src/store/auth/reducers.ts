import { AuthActions } from './actions';
import { Profile } from './types';

export interface AuthState {
  isAuthenticated: boolean;
  profile?: Profile;
}

const initialState: AuthState = {
  isAuthenticated: false,
  profile: undefined,
}

export default function authReducer(
  state = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case 'auth.isAuthenticated.set':
      return {
        ...state,
        isAuthenticated: action.payload
      }
    case 'auth.authenticatedUser.set':
      return {
        ...state,
        isAuthenticated: true,
        profile: action.payload
      }
    default:
      return state
  }
}
