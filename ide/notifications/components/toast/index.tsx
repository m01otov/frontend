import { forwardRef, useCallback, useMemo } from 'react';
import { useSnackbar, SnackbarContent, type CustomContentProps } from 'notistack';
import cn from 'classnames';
import { startCase, toLower } from 'lodash';

import { Icon } from '@lukoil/scad-ide-ui-core';

import styles from './styles.module.scss';

export const Toast = forwardRef<HTMLDivElement, CustomContentProps>(({ id, message, variant }, ref) => {
  const { closeSnackbar } = useSnackbar();

  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  const VariantIcon = useMemo(() => {
    return Icon[startCase(toLower(variant))]
  }, [variant]);

  return (
    <SnackbarContent ref={ref}>
      <div className={styles.toast}>
        <div className={styles.toast_content}>
          <div className={cn(
              styles.toast_content__icon,
              styles[`toast_content__icon--variant-${variant}`]
            )}>
            {VariantIcon && <VariantIcon size={18} />}
          </div>
          <div className={styles.toast_content__message}>
            {message}
          </div>
        </div>
        
        <button
          className={styles.toast_close_button}
          onClick={handleDismiss}>
          <Icon.Clear size={8} />
        </button>
      </div>
    </SnackbarContent>
  );
});

Toast.displayName = 'Toast';
