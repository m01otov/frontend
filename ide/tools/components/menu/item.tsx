import { type ButtonHTMLAttributes, forwardRef, useCallback } from 'react';
import cn from 'classnames';

import { EEditorTool } from '../../enums';

import styles from './styles.module.scss';

type TToolsMenuItemProps = {
  id: EEditorTool;
  isActive?: boolean;
  inline?: boolean;
  onClick: (id: EEditorTool) => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

export const ToolsMenuItem = forwardRef<HTMLButtonElement, TToolsMenuItemProps>(({
  id,
  isActive = false,
  children,
  inline = false,
  onClick,
  ...rest
}, ref) => {

  const handleClick = useCallback(() => {
    onClick && onClick(id)
  }, [id, onClick]);

  return (
    <button
      ref={ref}
      className={cn(
        styles.tools_menu__item,
        {
          [styles['tools_menu__item--active']]: isActive,
          [styles['tools_menu__item--inline']]: inline
        }
      )}
      onClick={handleClick}
      {...rest}>
      {children}
    </button>
  );
})

ToolsMenuItem.displayName = 'ToolsMenuItem';
