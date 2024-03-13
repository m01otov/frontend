import { OptionHTMLAttributes, forwardRef, useCallback } from 'react';

import { useForwardedRef } from '../../hooks/forwarded-ref.hook';

import styles from './styles.module.scss';

type TOptionProps = {
  onClick?: (value: string | number | readonly string[] | undefined) => void;
} & Omit<OptionHTMLAttributes<HTMLOptionElement>, 'onClick'>;

export const Option = forwardRef<HTMLDivElement, TOptionProps>(({
  value,
  children,
  onClick
}, ref) => {
  const forwardedRef = useForwardedRef(ref);

  const handleClick = useCallback(() => {
    onClick && onClick(value);
  }, [value]);

  return (
    <div
      ref={forwardedRef}
      className={styles.option}
      onClick={handleClick}>
      {children}
    </div>
  );
})

Option.displayName = 'Option';
