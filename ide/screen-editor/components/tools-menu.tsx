import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';

import { ToolsMenu } from '@lukoil/scad-ide-tools';
import { useScreenEditorContext } from '../provider';

export const ScreenEditorToolsMenu = observer(forwardRef<HTMLDivElement, unknown>((_, ref) => {

  const { tools, setActiveTool, activeToolId } = useScreenEditorContext();

  return (
    <ToolsMenu
      ref={ref}
      tools={tools}
      active={activeToolId}
      onChange={setActiveTool} />
  );

}))

ScreenEditorToolsMenu.displayName = 'ScreenEditorToolsMenu';
