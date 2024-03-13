import { type FC } from 'react';

import { ContextMenu, ContextMenuGroup, ContextMenuItem, type TContextMenuProps } from '@lukoil/scad-ide-ui-core';

type TScreenEditorOutlinerItemContextMenuProps = {
  onCopy: () => void;
  onRename: () => void;
  onRemove: () => void;
} & Omit<TContextMenuProps, 'children'>

export const ScreenEditorOutlinerItemContextMenu: FC<TScreenEditorOutlinerItemContextMenuProps> = ({
  onCopy,
  onRename,
  onRemove,
  ...rest
}) => (
  <ContextMenu {...rest}>
    <ContextMenuGroup>
      <ContextMenuItem
        onClick={onCopy}>
        Дублировать
      </ContextMenuItem>
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

ScreenEditorOutlinerItemContextMenu.displayName = 'ScreenEditorOutlinerItemContextMenu';
