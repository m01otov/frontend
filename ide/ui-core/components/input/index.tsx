import { forwardRef, type ReactNode, type InputHTMLAttributes } from 'react';
import cn from 'classnames';

import { useForwardedRef } from '../../hooks/forwarded-ref.hook';
import { useFocusElement } from '../../hooks/focus-element.hook';

import styles from './styles.module.scss';

type TInputProps = {
  prefix?: ReactNode;
  sufix?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'prefix'>;

export const Input = forwardRef<HTMLInputElement, TInputProps>(({
  prefix,
  sufix,
  disabled,
  className,
  ...rest
}, ref) => {
  const forwardedRef = useForwardedRef(ref);
  const isFocused = useFocusElement(forwardedRef);

  return (
    <div
      className={cn(
        className,
        styles.input,
        {
          [styles['input--focus']]: isFocused,
          [styles['input--disabled']]: disabled
        }
      )}>
      {prefix}
      <input
        ref={forwardedRef}
        type="text"
        disabled={disabled}
        onFocus={focus}
        onBlur={blur}
        {...rest} />
      {sufix}
    </div>
  );
})