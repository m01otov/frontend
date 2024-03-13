import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';

import { ToolsMenu } from '@lukoil/scad-ide-tools';
import { useWidgetEditorContext } from '../provider';

export const WidgetEditorToolsMenu = observer(forwardRef<HTMLDivElement, unknown>((_, ref) => {
  
  const { tools, setActiveTool, activeToolId } = useWidgetEditorContext();

  return (
    <ToolsMenu
      ref={ref}
      tools={tools}
      active={activeToolId}
      onChange={setActiveTool} />
  );
}))

WidgetEditorToolsMenu.displayName = 'WidgetEditorToolsMenu';
