import { forwardRef, type ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type TButtonProps = {
  weight?: 'primary' | 'secondary'
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, TButtonProps>(({
  weight = 'primary',
  className,
  children,
  ...rest
}, ref) => 
  <button
    ref={ref}
    className={cn(
      styles.button,
      styles[`button--weight-${weight}`],
      className
    )}
    {...rest}>
    {children}
  </button>
);

