import { type ButtonHTMLAttributes, type FC } from 'react';

import styles from './styles.module.scss';

type TContextMenuItemProps = {
} & ButtonHTMLAttributes<HTMLButtonElement>

export const ContextMenuItem: FC<TContextMenuItemProps> = ({
  children,
  onClick,
  ...rest
}) => {
  return (
    <button
      className={styles.context_menu__item}
      onClick={onClick}
      {...rest}>
      {children}
    </button>
  );
}

ContextMenuItem.displayName = 'ContextMenuItem';
