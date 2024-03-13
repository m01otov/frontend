import { ChangeEvent, forwardRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { Icon, Input } from '@lukoil/scad-ide-ui-core';
import { useFileExplorerContext } from '../../provider';

import styles from './styles.module.scss';

export const FileExplorerSearch = observer(forwardRef<HTMLInputElement, unknown>((_, ref) => {
  const { searchQuery, setSearchQuery } = useFileExplorerContext();

  const handleSetSearchQuery = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, [setSearchQuery])

  const handleClearSearchQuery = useCallback(() => {
    setSearchQuery('');
  }, [setSearchQuery])

  return (
    <div
      className={styles.file_explorer__search}>
      <Input
        ref={ref}
        placeholder="Поиск..."
        prefix={
          <Icon.Search size={14} />
        }
        sufix={searchQuery.length > 0 &&
          <button
            className={styles.file_explorer__search_clear_button}
            onClick={handleClearSearchQuery}>
            <Icon.Clear size={8} />
          </button>
        }
        value={searchQuery}
        onChange={handleSetSearchQuery} />
    </div>
  )
}))

FileExplorerSearch.displayName = 'FileExplorerSearch';
