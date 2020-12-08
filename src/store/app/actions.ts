import { DisplayMode, Locale } from './types';
import { typedAction } from '../helpers';
import { Email, Subscription } from '../../shared/types';


export const setLocale = (locale: Locale) => {
  return typedAction(
    'app.locale.set',
    locale
  );
};

export const setMode = (mode: DisplayMode) => {
  return typedAction(
    'app.mode.set',
    mode
  );
};

export const setSelectedSubscription = (subscription?: Subscription) => {
  return typedAction(
    'app.selectedSubscription.set',
    subscription
  );
};

export const setSelectedEmail = (email?: Email) => {
  return typedAction(
    'app.selectedEmail.set',
    email
  );
};


export type Actions = ReturnType<
  typeof setLocale
  | typeof setMode
  | typeof setSelectedSubscription
  | typeof setSelectedEmail
>
