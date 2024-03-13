import { type FC, type PropsWithChildren, forwardRef } from 'react';

import styles from './styles.module.scss';

type TPropEditorContainerProps = PropsWithChildren<{
  title?: string;
}>;

export const PropEditorContainer = forwardRef<HTMLDivElement, TPropEditorContainerProps>(({
  title,
  children
}, ref) => {
  return (
    <div
      ref={ref}
      className={styles.prop_editor_container}>
      {title &&
        <div className={styles.prop_editor_container__title}>
          {title}
        </div>
      }

      <div className={styles.prop_editor_container__content}>
        {children}
      </div>
    </div>
  )
})

export const PropEditorRow: FC<PropsWithChildren> = ({
  children
}) => (
  <div className={styles.prop_editor_container__content_row}>
    {children}
  </div>
)

PropEditorContainer.displayName = 'PropEditorContainer';
