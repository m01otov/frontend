import { HTMLAttributes, forwardRef, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { type Nullable, PARENT_COMPONENT } from '@lukoil/scad-runtime-core';
import { Icon, Panel, Tree } from '@lukoil/scad-ide-ui-core';
import { useWidgetEditorContext } from '../../provider';
import { WidgetEditorOutlinerItem } from './item';

import styles from './styles.module.scss';

type TWidgetEditorOutlinerProps = {} & Pick<HTMLAttributes<HTMLDivElement>, 'className'>

export const WidgetEditorOutliner = observer(forwardRef<HTMLDivElement, TWidgetEditorOutlinerProps>(({
  className
}, ref) => {
  
  const { widget, makeSelection, clearSelection } = useWidgetEditorContext();

  const roots = useMemo(() => {
    return widget.entities.asArray.filter(([_, components]) => components[PARENT_COMPONENT].id === null);
  }, [widget.entities.asArray]);

  const handleSelect = useCallback((nodeId: Nullable<string>) => {
    if (nodeId) makeSelection([nodeId]);
    else clearSelection();
  }, [])

  return (
    <Panel
      ref={ref}
      className={cn(styles.widget_editor_outliner, className)}>
      {{
        header: (
          <div className={styles.widget_editor_outliner__header}>
            <Icon.Tree size={14} />
            Структура виджета
          </div>
        ),
        content: (
          <div className={styles.widget_editor_outliner__content}>
            <Tree
              withIndentLines
              onActiveNodeChange={handleSelect}>
              {roots.map(entity =>
                <WidgetEditorOutlinerItem
                  key={entity[0].description}
                  entity={entity} />  
              )}
            </Tree>
          </div>
        )
      }}
    </Panel>
  )
}))

WidgetEditorOutliner.displayName = 'WidgetEditorOutliner';
