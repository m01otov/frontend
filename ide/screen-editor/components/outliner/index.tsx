import { HTMLAttributes, forwardRef, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { Icon, Panel, Tree } from '@lukoil/scad-ide-ui-core'
import { Nullable, PARENT_COMPONENT } from '@lukoil/scad-runtime-core';
import { useScreenEditorContext } from '../../provider';
import { ScreenEditorOutlinerItem } from './item';

import styles from './styles.module.scss';

type TScreenEditorOutlinerProps = {} & Pick<HTMLAttributes<HTMLDivElement>, 'className'>

export const ScreenEditorOutliner = observer(forwardRef<HTMLDivElement, TScreenEditorOutlinerProps>(({
  className
}, ref) => {

  const { entities, makeSelection, clearSelection  } = useScreenEditorContext();

  const roots = useMemo(() => {
    return entities.asArray.filter(
      ([_, components]) => components[PARENT_COMPONENT].id === null
    );
  }, [entities.asArray]);

  const handleSelect = useCallback((nodeId: Nullable<string>) => {
    if (nodeId) makeSelection([nodeId]);
    else clearSelection();
  }, [])

  return (
    <Panel
      ref={ref}
      className={cn(styles.screen_editor_outliner, className)}>
      {{
        header: (
          <div className={styles.screen_editor_outliner__header}>
            <Icon.Tree size={14} />
            Структура экрана
          </div>
        ),
        content: (
          <div className={styles.screen_editor_outliner__content}>
            <Tree
              withIndentLines
              onActiveNodeChange={handleSelect}>
              {roots.map(entity =>
                <ScreenEditorOutlinerItem
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

ScreenEditorOutliner.displayName = 'ScreenEditorOutliner';
