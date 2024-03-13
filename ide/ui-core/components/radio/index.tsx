import { type AllHTMLAttributes, type HTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type TRadioProps = HTMLAttributes<HTMLInputElement>
& Pick<AllHTMLAttributes<HTMLInputElement>, 'disabled' | 'checked'>;

export const Radio = forwardRef<HTMLInputElement, TRadioProps>(({
  children,
  ...rest
}, ref) => (
  <label
    className={cn(
      styles.radio,
      {
        [styles['radio--disabled']]: rest.disabled
      },
      rest.className
    )}>
    <input
      ref={ref}
      type="radio"
      {...rest} />
    {children}
  </label>
))

Radio.displayName = 'Radio';
