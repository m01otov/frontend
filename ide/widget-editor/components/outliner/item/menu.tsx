import { type FC } from 'react';

import { ContextMenu, ContextMenuGroup, ContextMenuItem, type TContextMenuProps } from '@lukoil/scad-ide-ui-core';

type TWidgetEditorOutlinerItemContextMenuProps = {
  onCopy: () => void;
  onRename: () => void;
  onRemove: () => void;
} & Omit<TContextMenuProps, 'children'>

export const WidgetEditorOutlinerItemContextMenu: FC<TWidgetEditorOutlinerItemContextMenuProps> = ({
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

WidgetEditorOutlinerItemContextMenu.displayName = 'WidgetEditorOutlinerItemContextMenu';
