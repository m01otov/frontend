import { forwardRef, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { startCase, toLower } from 'lodash';

import { Icon } from '@lukoil/scad-ide-ui-core';
import type { TToolsList } from '../../types';
import { EEditorTool } from '../../enums';
import { ToolsMenuGroup } from './group';
import { ToolsMenuItem } from './item';

import styles from './styles.module.scss';

type TToolsMenuProps = {
  tools: Partial<TToolsList>;
  active: EEditorTool;
  onChange: (value: EEditorTool) => void;
};

export const ToolsMenu = observer(forwardRef<HTMLDivElement, TToolsMenuProps>(({
  tools,
  active,
  onChange
}, ref) => {
  
  const groupedTools = useMemo(() => {
    return Object.entries(tools).reduce((out, [toolName, toolData]) => {
      if (!toolData.category) {
        out.set(toolName, toolData);
      }
      else {
        if (!out.has(toolData.category)) {
          out.set(toolData.category, new Map());
        }

        out.get(toolData.category).set(toolName, toolData);
      }

      return out;
    }, new Map())
  }, [tools]);

  return (
    <div
      ref={ref}
      className={styles.tools_menu}>
      {[...groupedTools].map(([id, value]) => {
        
        if (value instanceof Map) {
          return (
            <ToolsMenuGroup
              key={id}
              activeToolId={active}
              onClick={onChange}>
              {[...value].map(([id, { displayName }]) => {
                const iconName = `${startCase(toLower(id))}Tool`;
                const IconComponent = Icon[iconName];

                return (
                  <ToolsMenuItem
                    key={id}
                    id={id as EEditorTool}
                    inline
                    onClick={onChange}>
                    <IconComponent size={14} />
                    {displayName}
                  </ToolsMenuItem>
                )
              })}
            </ToolsMenuGroup>
          )
        }

        const iconName = `${startCase(toLower(id))}Tool`;
        const IconComponent = Icon[iconName];

        return (
          <ToolsMenuItem
            key={id}
            id={id as EEditorTool}
            isActive={active === id}
            onClick={onChange}>
            <IconComponent size={14} />
          </ToolsMenuItem>
        )
      })}
    </div>
  );
}))

ToolsMenu.displayName = 'ToolsMenu';
