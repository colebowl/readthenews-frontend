import { Actions } from './actions';
import { DisplayMode, Locale } from './types';

export interface AppState {
  mode: DisplayMode;
  locale: Locale;
}

const initialState: AppState = {
  mode: 'light',
  locale: 'en-ca',
}

export default function appReducer(
  state = initialState,
  action: Actions
): AppState {
  switch (action.type) {
    case 'app.mode.set':
      return {
        ...state,
        mode: action.payload
      }
    case 'app.locale.set':
      return {
        ...state,
        locale: action.payload
      }
    default:
      return state
  }
}
