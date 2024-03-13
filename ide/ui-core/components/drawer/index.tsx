import { type PropsWithChildren, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickAway } from 'react-use';
import cn from 'classnames';

import { useForwardedRef } from '../../hooks/forwarded-ref.hook';

import styles from './styles.module.scss';

type TDrawerProps = PropsWithChildren<{
  show: boolean;
  side?: 'left' | 'right';
  onClose?: () => void;
}>;

export const Drawer = forwardRef<HTMLDivElement, TDrawerProps>(({
  show,
  side = 'left',
  children,
  onClose
}, ref) => {

  const forwardedRef = useForwardedRef(ref);

  useClickAway(forwardedRef, () => onClose && onClose());

  return createPortal (
    <AnimatePresence>
      {show &&
        <motion.div
          ref={forwardedRef}
          className={cn(
            styles.drawer,
            styles[`drawer--${side}`]

           )}
          initial={{ opacity: 0, transform: `translateX(${side === 'left' ? -100 : 100}%)` }}
          animate={{ opacity: 1, transform: '0' }}
          exit={{ opacity: 0, transform: `translateX(${side === 'left' ? -100 : 100}%)` }}
          transition={{ duration: .2 }}>
          {children}
        </motion.div>
      }
    </AnimatePresence>
    ,document.body
  )
})

Drawer.displayName = 'Drawer';
