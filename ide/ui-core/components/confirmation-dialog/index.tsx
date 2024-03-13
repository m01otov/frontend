import type { FC } from 'react'
import { type TPopupProps, Popup, Button } from '@lukoil/scad-ide-ui-core'

import styles from './styles.module.scss';

type TConfirmationDialogProps = {
  onApply: (...args: any[]) => void;
  title?: string;
  message?: string;
} & Omit<TPopupProps, 'children'>

export const ConfirmationDialog: FC<TConfirmationDialogProps> = ({
  show,
  title = 'Внимание! Изменения не сохранены',
  message = 'Вы уверены что хотите закрыть редактор с потерей изменений?',
  onApply,
  onClose
}) => (
  <Popup
    show={show}
    onClose={onClose}>
    {{
      header: title,
      content: (
        <div className={styles.confirmation_dialog__content}>
          {message}
        </div>
      ),
      footer: (
        <div className={styles.confirmation_dialog__footer}>
          <Button weight="secondary" onClick={onClose}>Нет</Button>
          <Button onClick={onApply}>Да</Button>
        </div>
      )
    }}
  </Popup>
)

ConfirmationDialog.displayName = 'ConfirmationDialog';
