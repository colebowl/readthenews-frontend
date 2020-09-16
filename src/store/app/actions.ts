import { DisplayMode, Locale } from './types';
import { typedAction } from '../helpers';


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

export type Actions = ReturnType<
  typeof setLocale
  | typeof setMode
>
