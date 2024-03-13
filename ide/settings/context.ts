import { makeObservable, action, observable } from 'mobx';
import { useInjection} from 'inversify-react';

export const SETTINGS_CONTEXT_TOKEN = Symbol('settings');

export interface ISettingsContextProps {
  theme: 'dark' | 'light';
}

export interface ISettingsContext extends ISettingsContextProps {
  setTheme: (value: 'dark' | 'light') => void;
}

export const createSettingsContext = (
  props: ISettingsContextProps
)  => makeObservable<ISettingsContext>({
  ...props,
  setTheme(value: 'dark' | 'light') {
    this.theme = value
  }
}, {
  theme: observable,
  setTheme: action.bound
})

export const useSettingsContext = () => {
  const settings = useInjection<ISettingsContext>(SETTINGS_CONTEXT_TOKEN);

  if (!settings) {
    throw new Error('You should call createSettingsContext() and bind it to DI container before use')
  } 

  return settings;
}
    