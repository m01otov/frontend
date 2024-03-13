import { forwardRef, type TextareaHTMLAttributes } from 'react';
import cn from 'classnames';

import { useForwardedRef } from '../../hooks/forwarded-ref.hook';
import { useFocusElement } from '../../hooks/focus-element.hook';

import styles from './styles.module.scss';

type TTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = forwardRef<HTMLTextAreaElement, TTextareaProps>(({
  disabled,
  className,
  ...rest
}, ref) => {
  const forwardedRef = useForwardedRef(ref);
  const isFocused = useFocusElement(forwardedRef);

  return (
    <textarea
      ref={forwardedRef}
      disabled={disabled}
      onFocus={focus}
      onBlur={blur}
      placeholder='ASDASDASD'
      className={cn(
        className,
        styles.textarea,
        {
          [styles['textarea--focus']]: isFocused,
          [styles['textarea--disabled']]: disabled
        }
      )}
      {...rest} />
  );
})