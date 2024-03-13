import type { SnackbarKey } from 'notistack';

import type { INotification } from './notification.interface';

export interface INotificationsContext {
  queue: INotification[];

  add: (item: Omit<INotification, 'key'>) => void;

  success: (message: string) => void;
  
  info: (message: string) => void;

  warning: (message: string) => void;

  error: (message: string) => void;

  remove: (key: SnackbarKey) => void;
}
