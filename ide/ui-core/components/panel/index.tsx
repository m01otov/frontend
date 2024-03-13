import { forwardRef, HTMLAttributes, type ReactNode } from 'react';
import cn from 'classnames'

import styles from './styles.module.scss';

type TPanelProps = {
  children: {
    header?: ReactNode,
    content: ReactNode,
    footer?: ReactNode
  }
} & Pick<HTMLAttributes<HTMLDivElement>, 'className'>;

export const Panel = forwardRef<HTMLDivElement, TPanelProps>(({ children, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(styles.panel, className)}>
      {children.header &&
        <div className={styles.panel_header}>
          {children.header}
        </div>
      }

      <div className={styles.panel_content}>
        {children.content && children.content}
      </div>

      {children.footer &&
        <div className={styles.panel_footer}>
          {children.footer}
        </div>
      }
  </div>
  );
});

Panel.displayName = 'Panel';
