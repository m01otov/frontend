import { type CSSProperties, type HTMLAttributes, forwardRef, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { type TVector2 } from '@lukoil/scad-runtime-core';
import { useForwardedRef } from '@lukoil/scad-ide-ui-core';

import { Backdrop } from '../backdrop';

import styles from './styles.module.scss';

type TPopoverProps = {
  show: boolean;
  offset?: number;
  parent: HTMLElement | null;
  onClickAway?: () => void;
} & Pick<HTMLAttributes<HTMLDivElement>, 'children'>;

export const Popover = forwardRef<HTMLDivElement, TPopoverProps>(({
  show,
  offset = 8,
  children,
  parent,
  onClickAway,
  ...rest
}, ref) => {
  const forwardedRef = useForwardedRef(ref);

  const [position, setPosition] = useState<TVector2>([0, 0]);
  const [minWidth, setMinWidth] = useState<number>(0);

  useLayoutEffect(() => {
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();

    setPosition([
      parentRect.x,
      parentRect.y + parentRect.height + offset
    ]);
    setMinWidth(parentRect.width);
  }, [parent, offset, show])

  useLayoutEffect(() => {
    let x = position[0];
    let y = position[1];

    const { current: popoverElement } = forwardedRef;
    if (!popoverElement) return;

    if (x + popoverElement.offsetWidth > window.innerWidth) {
      setPosition([x - popoverElement.offsetWidth, y])
    }

    if (y + popoverElement.offsetHeight > window.innerHeight) {
      setPosition([x, y - popoverElement.offsetHeight])
    }
  }, [forwardedRef.current, position])

  return (
    <>
      <Backdrop isTransparent show={show} onClose={onClickAway} />
      
      {createPortal(
        <AnimatePresence>
          {show &&
            <motion.div
              ref={forwardedRef}
              className={styles.popover}
              style={{
                '--position-x': `${position[0]}px`,
                '--position-y': `${position[1]}px`,
                '--min-width': `${minWidth}px`
              } as CSSProperties}
              initial={{ opacity: 0, top: 'calc(var(--position-y) - 10px)' }}
              animate={{ opacity: 1, top: 'var(--position-y)' }}
              exit={{ opacity: 0, top: 'calc(var(--position-y) - 10px)' }}
              transition={{ duration: .2, delay: 0 }}
              {...rest}>
              {children}
            </motion.div>
          }
        </AnimatePresence>
        , document.body
      )}
    </>
  )
})

Popover.displayName = 'Popover';
