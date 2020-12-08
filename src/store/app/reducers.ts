import { Email, Subscription } from '../../shared/types';
import { Actions } from './actions';
import { DisplayMode, Locale } from './types';

export interface AppState {
  mode: DisplayMode;
  locale: Locale;
  selectedSubscription?: Subscription;
  selectedEmail?: Email;
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

    case 'app.selectedSubscription.set':
      return {
        ...state,
        selectedSubscription: action.payload,
        selectedEmail: undefined,
      }
    case 'app.selectedEmail.set':
      return {
        ...state,
        selectedEmail: action.payload
      }

    default:
      return state
  }
}
