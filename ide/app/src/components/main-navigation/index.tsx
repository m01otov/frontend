import { type PropsWithChildren, type FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import styles from './styles.module.scss';

type TMainNavigationProps = PropsWithChildren<unknown>;
type TMainNavigationItemProps = PropsWithChildren<{
  to: string
  end?: boolean;
  state?: unknown
}>;

type TMainNavigationComponent = FC<TMainNavigationProps> & {
  Item: FC<TMainNavigationItemProps>
}

export const MainNavigation: TMainNavigationComponent = ({
  children
}) => (
  <nav className={styles.main_navigation}>
    {children}
  </nav>
)

const MainNavigationItem: FC<TMainNavigationItemProps> = ({
  to,
  state,
  end = false,
  children
}) => (
  <NavLink 
    className={({ isActive }) => isActive
      ? cn(
        styles.main_navigation__item,
        styles['main_navigation__item--active']
      )
      : styles.main_navigation__item
    }
    to={to}
    state={state}
    end={end}>
    {children}
  </NavLink>
)

MainNavigation.Item = MainNavigationItem;

MainNavigation.displayName = 'MainNavigation';
MainNavigationItem.displayName = 'MainNavigationItem';
