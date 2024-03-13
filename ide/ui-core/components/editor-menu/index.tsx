import { useState, forwardRef, useCallback, useRef, useMemo, PropsWithChildren, CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { useClickAway } from 'react-use';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';

import { TVector2 } from '@lukoil/scad-runtime-core';
import { Icon, useForwardedRef } from '@lukoil/scad-ide-ui-core';

import styles from './styles.module.scss';

const DEFAULT_OFFSET = [0, 4];

export type TEditroMenuProps = PropsWithChildren<{
  offset?: TVector2;
}>;

export const EditorMenu = forwardRef<HTMLButtonElement, TEditroMenuProps>(({
  offset = DEFAULT_OFFSET,
  children,
}, ref) => {
  const forwardedRef = useForwardedRef(ref);
  const menuRef = useRef(null)
  const [isShow, setIsShow] = useState(false);
  const [offsetX, offsetY] = offset;

  const [x, y] = useMemo(() => {
    const { current: targetElement } = forwardedRef;
    if (!targetElement) return [0, 0];

    const { left, bottom } = targetElement.getBoundingClientRect();

    return [left, bottom]
  }, [forwardedRef.current])

  const toggleMenuState = useCallback(() => setIsShow((state) => !state), []);
  const handleMenuItemClick = useCallback(() => setIsShow(false), []);

  useClickAway(menuRef, () => setIsShow(false))

  return (
    <>
      <button
        className={cn(
          styles.editor_menu_button,
          {
            [styles['editor_menu_button--active']]: isShow
          }
        )}
        ref={forwardedRef}
        onClick={toggleMenuState}>
        <Icon.Menu size={18} />
      </button>

      {createPortal(
        <AnimatePresence>
          {isShow &&
            <motion.div
              ref={menuRef}
              className={styles.editor_menu}
              style={{
                '--position-x': `${x + offsetX}px`,
                '--position-y': `${y + offsetY}px`,
              } as CSSProperties}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: .2, delay: 0 }}
              onClick={handleMenuItemClick}>
              {children}
            </motion.div>
          }
        </AnimatePresence>
        , document.body
      )}
    </>
  )
})

EditorMenu.displayName = 'EditorMenu';