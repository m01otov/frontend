import { type ButtonHTMLAttributes, type FC } from 'react';

import styles from './styles.module.scss';

type TContextMenuGroupProps = ButtonHTMLAttributes<HTMLButtonElement>

export const ContextMenuGroup: FC<TContextMenuGroupProps> = ({
  children,
}) => {
  return (
    <div
      className={styles.context_menu__group}>
      {children}
    </div>
  );
}

ContextMenuGroup.displayName = 'ContextMenuGroup';
