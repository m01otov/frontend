import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';

import styles from './styles.module.scss';

type TBackdropProps = {
  show: boolean;
  isTransparent?: boolean;
  onClose?: () => void;
};

export const Backdrop = forwardRef<HTMLDivElement, TBackdropProps>(({
  show,
  isTransparent = false,
  onClose,
}, ref) => createPortal(
  <AnimatePresence>
    {show &&
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: .2 }}
        className={cn(
          styles.backdrop,
          {
            [styles['backdrop-transparent']]: isTransparent
          },
        )}
        onClick={onClose}>
      </motion.div>
    }
  </AnimatePresence>
  , document.body
));

Backdrop.displayName = 'Backdrop';
