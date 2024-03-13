import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';

import { ConfirmationDialog, ContextMenuGroup, ContextMenuItem, EditorMenu, useConfirmationCallback } from '@lukoil/scad-ide-ui-core';
import { useCodeEditorContext } from '../provider';

type TCodeEditorMenuProps = {};

export const CodeEditorMenu = observer(forwardRef<HTMLButtonElement, TCodeEditorMenuProps>((_, ref) => {
  const { save, closeEditor } = useCodeEditorContext();

  const {
    isShowDialog,
    handleOpen,
    handleClose,
    handleApply
  } = useConfirmationCallback(() => {
    closeEditor();
  }, () => true)

  return (
    <>
      <EditorMenu
        ref={ref}>
        <ContextMenuGroup>
          <ContextMenuItem onClick={handleOpen}>
            Закрыть редактор
          </ContextMenuItem>
        </ContextMenuGroup>
        

        <ContextMenuGroup>
          <ContextMenuItem onClick={save}>
            Сохранить
          </ContextMenuItem>
          
          <ContextMenuItem disabled onClick={save}>
            Сохранить как...
          </ContextMenuItem>
        </ContextMenuGroup>
      </EditorMenu>

      <ConfirmationDialog
        show={isShowDialog}
        onApply={handleApply}
        onClose={handleClose} />
    </>
  )
}))

CodeEditorMenu.displayName = 'CodeEditorMenu';
