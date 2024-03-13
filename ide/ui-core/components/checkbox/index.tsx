import { type AllHTMLAttributes, type HTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type TCheckboxProps = HTMLAttributes<HTMLInputElement>
& Pick<AllHTMLAttributes<HTMLInputElement>, 'disabled' | 'checked'>;

export const Checkbox = forwardRef<HTMLInputElement, TCheckboxProps>(({
  children,
  ...rest
}, ref) => {

  return (
    <label
      className={cn(
        styles.checkbox,
        {
          [styles['checkbox--disabled']]: rest.disabled
        },
        rest.className
      )}>
      <input
        ref={ref}
        type="checkbox"
        {...rest} />
        {children}
    </label>
  );
})

Checkbox.displayName = 'Checkbox';
