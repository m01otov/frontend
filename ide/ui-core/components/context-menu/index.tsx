import { type CSSProperties, type PropsWithChildren, type RefObject, forwardRef, useState, useCallback, useLayoutEffect, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickAway } from 'react-use';

import { type TVector2 } from '@lukoil/scad-runtime-core';
import { useForwardedRef } from '../..';

import styles from './styles.module.scss'

const DEFAULT_OFFSET = [4, 4];

export type TContextMenuProps = PropsWithChildren<{
  targetRef: RefObject<HTMLElement>;
  offset?: TVector2;
}>;

export const ContextMenu = forwardRef<HTMLDivElement, TContextMenuProps>(({
  targetRef,
  offset = DEFAULT_OFFSET,
  children
}, ref) => {

  const forwardedRef = useForwardedRef(ref);
  const [isShow, setIsShow] = useState(false);
  const [position, setPosition] = useState<TVector2>([0, 0]);
  const [x, y] = position;
  const [offsetX, offsetY] = offset;

  const handleItemClick = useCallback(() => {
    setIsShow(false)
  }, [])

  useClickAway(forwardedRef, () => setIsShow(false))

  useEffect(() => {
    function handleToggleContextMenu(event: any) {
      event.preventDefault();
      event.stopPropagation();

      setIsShow(prev => !prev);
      setPosition([event.clientX, event.clientY]);
    }
    
    const { current: targetElement } = targetRef;
    if (!targetElement) return;
    
    targetElement.addEventListener('contextmenu', handleToggleContextMenu);

    return () => {
      targetElement.removeEventListener('contextmenu', handleToggleContextMenu);
    }
  }, [])

  useLayoutEffect(() => {
    const { current: containerEl } = forwardedRef;

    if (!containerEl || !isShow) return;

    setPosition(([x, y]) => {
      const position: TVector2 = [x, y];
      if (x + containerEl.offsetWidth > window.innerWidth) {
        position[0] = x - containerEl.offsetWidth
      }
  
      if (y + containerEl.offsetHeight > window.innerHeight) {
        position[1] = y - containerEl.offsetHeight
      }

      return position;
    })

  }, [isShow]);

  return (
    createPortal(
      <AnimatePresence>
        {isShow &&
          <motion.div
            ref={forwardedRef}
            className={styles.context_menu}
            style={{
              '--position-x': `${x + offsetX}px`,
              '--position-y': `${y + offsetY}px`,
            } as CSSProperties}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .2, delay: 0 }}
            onClick={handleItemClick}>
            {children}
          </motion.div>
        }
      </AnimatePresence>
      , document.body
    )
  );
})

ContextMenu.displayName = 'ContextMenu';
