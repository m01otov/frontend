import { makeObservable, action, observable } from 'mobx';
import { useInjection} from 'inversify-react';
import type { SnackbarKey } from 'notistack';

import type { INotification, INotificationsContext } from './interfaces';

export const NOTIFICATION_CONTEXT_TOKEN = Symbol('notification');

export const createNotificationsContext = () => makeObservable<INotificationsContext>({
  queue: [],

  add(item: Omit<INotification, 'key'>) {
    this.queue.push({
      key: new Date().getTime() + Math.random() as SnackbarKey,
      ...item
    });
  },

  success(message: string) {
    this.add({ variant: 'success', message });
  },

  info(message: string) {
    this.add({ variant: 'info', message });
  },

  warning(message: string) {
    this.add({ variant: 'warning', message });
  },

  error(message: string) {
    this.add({ variant: 'error', message });
  },

  remove(key: SnackbarKey) {
    this.queue = this.queue.filter(item => item.key !== key);
  }
}, {
  queue: observable,
  add: action.bound,
  success: action.bound,
  info: action.bound,
  warning: action.bound,
  error: action.bound,
  remove: action.bound
})


export const useNotificationsContext = () => {
  const notification = useInjection<INotificationsContext>(NOTIFICATION_CONTEXT_TOKEN);

  if (!notification) {
    throw new Error('useNotifications must be used within a NotificationsStoreProvider!');
  }

  return notification;
}
    