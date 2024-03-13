import { forwardRef, type PropsWithChildren } from 'react';

import styles from './styles.module.scss';

type TToolbarProps = PropsWithChildren<unknown>;

export const Toolbar = forwardRef<HTMLDivElement, TToolbarProps>(({
  children,
  ...rest
}, ref) => {
  return (
    <div
      ref={ref}
      className={styles.toolbar}
      {...rest}>
      {children}
    </div>
  );
})

Toolbar.displayName = 'Toolbar';
