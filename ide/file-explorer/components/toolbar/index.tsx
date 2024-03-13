import { forwardRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { Icon } from '@lukoil/scad-ide-ui-core';
import { useFileExplorerContext } from '../../provider';
import { EFileExplorerItemType } from '../../enums';

import styles from './styles.module.scss';

export const FileExplorerToolbar = observer(forwardRef<HTMLInputElement, unknown>((_, ref) => {
  const { addEmpty } = useFileExplorerContext();

  const handleAddDirectory = useCallback(() => {
    addEmpty(EFileExplorerItemType.DIR)
  }, [addEmpty]);

  const handleAddFile = useCallback(() => {
    addEmpty(EFileExplorerItemType.FILE)
  }, [addEmpty]);

  return (
    <div 
      ref={ref}
      className={styles.file_explorer__toolbar}>
      <Icon.Files size={14} />
      Файлы
      <div className={styles.file_explorer__toolbar_actions}>
        <button
          className={styles.file_explorer__toolbar_actions_item}
          onClick={handleAddFile}>
          <Icon.FileAdd size={16} />
        </button>

        <button
          className={styles.file_explorer__toolbar_actions_item}
          onClick={handleAddDirectory}>
          <Icon.FolderAdd size={16} />
        </button>
      </div>
    </div>
  )
}))

FileExplorerToolbar.displayName = 'FileExplorerToolbar';
