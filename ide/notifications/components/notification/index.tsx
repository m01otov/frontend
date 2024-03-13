import { useEffect, type FC, useRef } from 'react';
import { SnackbarProvider, useSnackbar, type SnackbarKey, type SnackbarProviderProps } from 'notistack';
import { observer } from 'mobx-react-lite';
import { autorun } from 'mobx';

import { useNotificationsContext } from '../../context';
import { Toast } from '../toast';

const Notifier: FC<unknown> = observer(() => {
  const displayed = useRef<SnackbarKey[]>([]);
  
  const context = useNotificationsContext();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    function storeDisplayed(id: SnackbarKey) {
      displayed.current = [...displayed.current, id];
    };

    function removeDisplayed(id: SnackbarKey) {
      displayed.current = displayed.current.filter(key => id !== key);
    };

    const reactionDisposer = autorun(() => {
      context.queue.forEach(({ key, message, ...rest }) => {
        if (displayed.current.includes(key)) return;

        enqueueSnackbar(message, {
          key,
          ...rest,
          onExited: (_, key) => {
            context.remove(key);
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

export type TNotificationsProps = SnackbarProviderProps;

export const Notifications: FC<TNotificationsProps> = (props) => (
  <SnackbarProvider
    Components={{
      info: Toast,
      success: Toast,
      warning: Toast,
      error: Toast
    }}
    {...props}>
    <Notifier />
  </SnackbarProvider>
);
