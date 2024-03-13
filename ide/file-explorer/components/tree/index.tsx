import { forwardRef, useCallback } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { ContextMenu, ContextMenuItem, Tree, useForwardedRef } from '@lukoil/scad-ide-ui-core';
import { useFileExplorerContext } from '../../provider';
import { EFileExplorerItemType } from '../../enums';
import { FileExplorerItem } from './item';
import { useFileDropzone } from '../../hooks/use-file-dropzone.hook';
import type { IDirectory, IFile } from '../../interfaces';

import styles from './styles.module.scss';

export const FileExplorerTree = observer(forwardRef<HTMLDivElement, unknown>((_, ref) => {
  const { roots, addEmpty, setActiveEntry, searchQuery, searchResult } = useFileExplorerContext();

  const forwardedRef = useForwardedRef(ref);

  const handleAddDirectory = useCallback(() => {
    addEmpty(EFileExplorerItemType.DIR)
  }, [addEmpty]);

  const handleAddFile = useCallback(() => {
    addEmpty(EFileExplorerItemType.FILE)
  }, [addEmpty]);

  const dropCallback = useCallback((data: IFile | IDirectory) => {
    if (!data.parentId) return null;

    data.updateParent(null)
  }, [])

  const [{ canDrop, isOverTarget }, drop] = useFileDropzone({ dropCallback })

  const entriesToRender = computed(() => {
    return searchQuery.length > 0
      ? searchResult
      : roots;
  }).get()

  return (
    <>
      <Tree
        // TODO: Починить типизацию при таком использовании forwardedRef
        // @ts-ignore
        ref={drop(forwardedRef)}
        withIndentLines
        className={cn({
          [styles['tree--over']]: isOverTarget && canDrop
        })}
        onActiveNodeChange={setActiveEntry}>
        {entriesToRender.map(entry =>
          <FileExplorerItem
            key={entry.id}
            model={entry}
            onAddDirectory={handleAddDirectory}
            onAddFile={handleAddFile} />
        )}
      </Tree>

      <ContextMenu 
        targetRef={forwardedRef}>
        <ContextMenuItem
          onClick={handleAddFile}>
          Новый файл
        </ContextMenuItem>
        
        <ContextMenuItem
          onClick={handleAddDirectory}>
          Новая папка...
        </ContextMenuItem>
      </ContextMenu>
    </>
  )
}))

FileExplorerTree.displayName = 'FileExplorerTree';
