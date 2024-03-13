import { Children, SelectHTMLAttributes, cloneElement, forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import cn from 'classnames';

import { useForwardedRef } from '../../hooks/forwarded-ref.hook';
import { useFocusElement } from '../../hooks/focus-element.hook';

import { Popover } from '../popover';

import styles from './styles.module.scss';
import { Icon } from '../icon';

type TSelectProps = {
  placeholder?: string;
  onChange?: (value: string | number | readonly string[] | undefined) => void;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'>;

export const Select = forwardRef<HTMLDivElement, TSelectProps>(({
  children,
  value,
  placeholder,
  disabled,
  onChange
}, ref) => {
  const forwardedRef = useForwardedRef(ref);
  const optionsRef = useRef<HTMLDivElement>(null);
  const isFocused = useFocusElement(forwardedRef);
  const [isShowOptions, setIsShowOptions] = useState(false);

  const handleShowItems = useCallback(() => {
    setIsShowOptions(true);
  }, []);

  const handleHideItems = useCallback(() => {
    setIsShowOptions(false);
  }, []);

  const selectedOption = useMemo(() => {
    return Children.toArray(children).find(child => (child as JSX.Element).props.value === value)
  }, [value, children]);

  const handleOptionClick = useCallback((
    value: string | number | readonly string[] | undefined
  ) => {
    onChange && onChange(value);
    handleHideItems();
  }, [onChange]);

  return (
    <>
      <div
        ref={forwardedRef}
        tabIndex={-1}
        className={cn(
          styles.select,
          {
            [styles['select--focus']]: isFocused,
            [styles['select--disabled']]: disabled,
            [styles['select--show-options']]: isShowOptions
          }
        )}
        onClick={handleShowItems}>
        <div 
          className={cn(
            styles.select_value,
            {
              [styles['select_value--empty']]: !value
            }
          )}>
          {selectedOption
            ? (selectedOption as JSX.Element).props.children
            : placeholder
          }
        </div>

        <div 
          className={cn(
            styles.select_arrow)
          }>
          <Icon.ArrowFill size={8} />
        </div>
      </div>

      <Popover
        ref={optionsRef}
        show={isShowOptions}
        parent={forwardedRef.current}
        onClickAway={handleHideItems}>
        {Children.toArray(children).map(child =>
          cloneElement(child as JSX.Element, {
            ...(child as JSX.Element).props,
            onClick: handleOptionClick
          })  
        )}
      </Popover>
    </>
  );
})

Select.displayName = 'Select';
