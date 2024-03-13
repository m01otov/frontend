import { type PropsWithChildren, forwardRef, useState, useLayoutEffect, type RefObject, type CSSProperties, type MutableRefObject } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { type TVector2 } from '@lukoil/scad-runtime-core';
import { useForwardedRef } from '../..';

import styles from './styles.module.scss';

type TErrorProps = PropsWithChildren<{
  show: boolean;
  parentRef: RefObject<HTMLElement> | MutableRefObject<HTMLInputElement | undefined>
}>;

export const Error = forwardRef<HTMLDivElement, TErrorProps>(({
  show,
  parentRef,
  children
}, ref) => {
  
  const forwardedRef = useForwardedRef(ref);

  const [position, setPosition] = useState<TVector2>([0, 0]);
  const [width, setWidth] = useState<number>(0);

  useLayoutEffect(() => {
    const { current: parentElement } = parentRef;
    if (!parentElement) return;

    const parentElementRect = parentElement.getBoundingClientRect();

    setPosition([
      parentElementRect.x,
      parentElementRect.y + parentElementRect.height
    ]);
    setWidth(parentElementRect.width);
  }, [parent, show])

  useLayoutEffect(() => {
    let x = position[0];
    let y = position[1];

    const { current: element } = forwardedRef;
    if (!element) return;

    if (x + element.offsetWidth > window.innerWidth) {
      setPosition([x - element.offsetWidth, y])
    }

    if (y + element.offsetHeight > window.innerHeight) {
      setPosition([x, y - element.offsetHeight])
    }
  }, [forwardedRef.current, position])

  return createPortal(
      <AnimatePresence>
      {show &&
        <motion.div
          ref={forwardedRef}
          className={styles.error}
          style={{
            '--position-x': `${position[0]}px`,
            '--position-y': `${position[1]}px`,
            '--width': `${width}px`
          } as CSSProperties}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .2, delay: 0 }}>
          {children}
        </motion.div>
      }
    </AnimatePresence>
    , document.body
  );
})

Error.displayName = 'Error';