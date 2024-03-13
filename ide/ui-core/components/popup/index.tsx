import { forwardRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { Backdrop } from '../backdrop';
import { Icon } from '../icon';

import styles from './styles.module.scss';

export type TPopupProps = {
  show: boolean;
  onClose?: () => void;
  children: {
    header?: ReactNode,
    content: ReactNode,
    footer?: ReactNode
  }
};

export const Popup = forwardRef<HTMLDivElement, TPopupProps>(({
  show,
  children,
  onClose
}, ref) => {
  return (
    <>
      <Backdrop show={show} onClose={onClose} />
      
      {createPortal(
        <AnimatePresence>
          {show && 
            <motion.div
              ref={ref}
              className={styles.popup}
              initial={{ opacity: 0, top: 'calc(50% - 20px)' }}
              animate={{ opacity: 1, top: '50%' }}
              exit={{ opacity: 0, top: 'calc(50% + 20px)' }}
              transition={{ duration: .2 }}>
              {children.header &&
                <div className={styles.popup_header}>
                  <div className={styles.popup_header__conten_slot}>
                    {children.header}
                  </div>
                  <button onClick={onClose}>
                    <Icon.Clear size={10} />
                  </button>
                </div>
              }

              <div className={styles.popup_content}>
                {children.content}
              </div>

              {children.footer &&
                <div className={styles.popup_footer}>
                  {children.footer}
                </div>
              }
            </motion.div>
          }
        </AnimatePresence>
        , document.body
      )}
    </>
  );
})

Popup.displayName = 'Popup';
