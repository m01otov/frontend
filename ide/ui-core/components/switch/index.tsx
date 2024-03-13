import { type AllHTMLAttributes, type HTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type TCheckboxProps = HTMLAttributes<HTMLInputElement>
& Pick<AllHTMLAttributes<HTMLInputElement>, 'disabled' | 'checked'>;

export const Switch = forwardRef<HTMLInputElement, TCheckboxProps>(({
  children,
  ...rest
}, ref) => (
  <label
    className={cn(
      styles.switch,
      {
        [styles['switch--disabled']]: rest.disabled
      },
      rest.className
    )}>

    <input
      ref={ref}
      type="checkbox"
      {...rest}/>
      <span className={styles.switch_knob}></span>
    {children}
  </label>
))

Switch.displayName = 'Switch';
