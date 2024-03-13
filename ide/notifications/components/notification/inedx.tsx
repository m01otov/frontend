import { SnackbarProvider, useSnackbar } from 'notistack';
import { observer } from 'mobx-react-lite';

import { useEffect, type FC, type PropsWithChildren, useRef } from 'react';
import type { SnackbarKey, SnackbarProviderProps } from 'notistack';
import { autorun } from 'mobx';

import { useNotifications } from '../../context';

const Notifier: FC<unknown> = observer(() => {
  const displayed = useRef<SnackbarKey[]>([]);
  
  const notifications = useNotifications();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    function storeDisplayed(id: SnackbarKey) {
      displayed.current = [...displayed.current, id];
    };

    function removeDisplayed(id: SnackbarKey) {
      displayed.current = displayed.current.filter(key => id !== key);
    };

    const reactionDisposer = autorun(() => {
      notifications.queue.forEach(({ key, message, ...rest }) => {
        if (displayed.current.includes(key)) return;

        enqueueSnackbar(message, {
          key,
          ...rest,
          onExited: (_, key) => {
            notifications.remove(key);
            removeDisplayed(key);
          },
        });

        storeDisplayed(key);
      });
    });

    return reactionDisposer;
  }, []);

  return null;
});

export const Notifications: FC<PropsWithChildren<SnackbarProviderProps>> = ({ children, ...rest }) => (
  <SnackbarProvider {...rest}>
    <Notifier />
  </SnackbarProvider>
);
