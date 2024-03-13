import { forwardRef, useCallback, useState, type MouseEvent, useMemo, useLayoutEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend'
import cn from 'classnames'

import { TreeNode, useForwardedRef } from '@lukoil/scad-ide-ui-core';

import { type IDirectory, type IFile } from '../../../interfaces';
import { useFileExplorerContext } from '../../../provider';
import { FileExplorerItemContextMenu } from './menu';
import { RenameForm } from '../../rename-form';
import { FileExplorerItemFileContent } from './file-content';
import { FileExplorerItemDirContent } from './dir-content';
import { EFileExplorerItemType } from '../../../enums';
import { DraggablePreview } from './draggable-preview';
import { useFileDropzone } from '../../../hooks/use-file-dropzone.hook';

import styles from './styles.module.scss';

type TFileExplorerItemProps = {
  model: IFile | IDirectory;
  onAddFile: () => void;
  onAddDirectory: () => void;
}

export const FileExplorerItem = observer(forwardRef<HTMLDivElement, TFileExplorerItemProps>(({
  model,
  onAddFile,
  onAddDirectory,
  ...rest
}, ref) => {
  const { save, remove, open } = useFileExplorerContext();

  const [isRename, setIsRename] = useState(false);

  const forwardedRef = useForwardedRef(ref);
  
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: model.isDir ? EFileExplorerItemType.DIR : (model as IFile).extension,
    item: model,
    canDrag: !model.isNew,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [model])

  const handleRenameStart = useCallback(() => {
    setIsRename(true);
  }, [])

  const handleOpen = useCallback(() => {
    if (!model.isDir) open((model as IFile))
  }, [model.isDir, open])

  const handleSave = useCallback((name: string) => {
    if (model.isNew) {
      save(name);
      return;
    }

    model.rename(name);
    setIsRename(false);
  }, [save, model.isNew, model.rename])

  const handleCancel = useCallback(() => {
    if (model.isNew) {
      remove(model.id);
      return;
    }
    
    setIsRename(false);
  }, [remove, model.id, model.isNew])

  const handleRemove = useCallback(() => {
    remove(model.id);
  }, [remove, model.id])

  const handleDoubleClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (event.detail !== 2) return;
    event.preventDefault();

    handleOpen()
  }, [handleOpen])

  const canDropCondition = useCallback(() => (
    model.type === EFileExplorerItemType.DIR && !isDragging
  ), [model.type, isDragging])

  const dropCallback = useCallback((data: IFile | IDirectory) => {
    if (data.parentId === model.id) return;

    data.updateParent(model.id)
  }, [model.id])

  const [{ isOverTarget: isOver, canDrop }, drop] = useFileDropzone({ canDrop: canDropCondition, dropCallback })

  const ContentComponent = useMemo(() => {
    return model.isDir
      ? FileExplorerItemDirContent
      : FileExplorerItemFileContent
  }, [model.isDir])

  useLayoutEffect(() => {
    if (!forwardedRef.current) return;

    drag(forwardedRef.current)
    dragPreview(getEmptyImage(), { captureDraggingState: true })
  }, [drag, dragPreview])

  useLayoutEffect(() => {
    if (!canDrop || !forwardedRef.current) return;

    drop(forwardedRef.current)
  }, [canDrop])

  return (
    <>
      {isDragging && (
        <DraggablePreview>
          <ContentComponent
            icon={<model.icon size={16} />}
            extension={(model as IFile).extension}>
            {model.name}
          </ContentComponent>
        </DraggablePreview>
      )}
      
      <TreeNode
        className={cn({
          [styles['file_explorer__item--over']]: isOver && canDrop
        })}
        ref={forwardedRef}
        key={model.id}
        id={model.id}
        content={
          <ContentComponent
            icon={<model.icon size={16} />}
            extension={(model as IFile).extension}>
            {model.isNew || isRename
              ? <RenameForm
                  name={model.name}
                  onSubmit={handleSave}
                  onCancel={handleCancel}/>
              : model.name
            }  
          </ContentComponent>
        }
        onChildsToggle={model.isDir
          ? (model as IDirectory).updateIsFolded
          : undefined
        }
        onDoubleClick={handleDoubleClick}
        {...rest}>
        {model.isDir
          ? (model as IDirectory).childs.map(model =>
            <FileExplorerItem
              key={model.id}
              model={model}
              onAddFile={onAddFile}
              onAddDirectory={onAddDirectory} />
          )
          : undefined
        }
      </TreeNode>

      <FileExplorerItemContextMenu
        targetRef={forwardedRef}
        showOpenFileItem={!model.isDir}
        onOpen={handleOpen}
        onAddFile={onAddFile}
        onAddDirectory={onAddDirectory}
        onRename={handleRenameStart}
        onRemove={handleRemove} />
    </>
  )
}))

FileExplorerItem.displayName = 'FileExplorerItem';
