import { type PropsWithChildren, type FC } from 'react';

import styles from './styles.module.scss';

type TMenuBarProps = PropsWithChildren<unknown>;

export const MenuBar: FC<TMenuBarProps> = ({
  children
}) => (
  <aside className={styles.menu_bar}>
    {children}
  </aside>
)

MenuBar.displayName = 'MenuBar';
