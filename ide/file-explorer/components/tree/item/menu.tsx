import { type FC } from 'react';

import { ContextMenu, ContextMenuGroup, ContextMenuItem, ContextSubmenu, type TContextMenuProps } from '@lukoil/scad-ide-ui-core';

type TFileExplorerItemContextMenuProps = {
  showOpenFileItem: boolean;
  onOpen: () => void;
  onAddFile: () => void;
  onAddDirectory: () => void;
  onRename: () => void;
  onRemove: () => void;
} & Omit<TContextMenuProps, 'children'>

export const FileExplorerItemContextMenu: FC<TFileExplorerItemContextMenuProps> = ({
  showOpenFileItem,
  onOpen,
  onAddFile,
  onAddDirectory,
  onRename,
  onRemove,
  ...rest
}) => (
  <ContextMenu {...rest}>
    {showOpenFileItem &&
      <ContextMenuGroup>
        <ContextMenuItem
          onClick={onOpen}>
          Открыть
        </ContextMenuItem>
      </ContextMenuGroup>
    }
    <ContextMenuGroup>
      <ContextSubmenu title="Создать...">
        <ContextMenuItem
          onClick={onAddFile}>
          Новый файл
        </ContextMenuItem>
        
        <ContextMenuItem
          onClick={onAddDirectory}>
          Новая папка...
        </ContextMenuItem>
      </ContextSubmenu>
    </ContextMenuGroup>

    <ContextMenuGroup>
      <ContextMenuItem
        onClick={onRename}>
        Переименовать
      </ContextMenuItem>

      <ContextMenuItem
        onClick={onRemove}>
        Удалить
      </ContextMenuItem>
    </ContextMenuGroup>
  </ContextMenu>
)

FileExplorerItemContextMenu.displayName = 'FileExplorerItemContextMenu';
