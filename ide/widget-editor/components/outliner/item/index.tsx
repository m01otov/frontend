import { forwardRef, useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { startCase, toLower } from 'lodash';
import cn from 'classnames';

import { EDITOR_DATA_COMPONENT, PARENT_COMPONENT, editorDataSystem, type TEntity } from '@lukoil/scad-runtime-core';
import { Icon, TreeNode, useForwardedRef } from '@lukoil/scad-ide-ui-core';
import { useWidgetEditorContext } from '../../../provider';
import { WidgetEditorOutlinerItemContextMenu } from './menu';
import { OutlinerRenameForm } from '../rename-form';

import styles from './styles.module.scss';

type TWidgetEditorOutlinerItemProps = {
  entity: TEntity;
}

export const WidgetEditorOutlinerItem = observer(forwardRef<HTMLDivElement, TWidgetEditorOutlinerItemProps>(({
  entity,
  ...rest
}, ref) => {
  const { widget, clearSelection } = useWidgetEditorContext();
  const forwardedRef = useForwardedRef(ref);
  const [id, components] = entity;
  const [isRename, setIsRename] = useState(false);
  
  const editorDataS = editorDataSystem(widget.entities);

  const childs = useMemo(() => {
    return widget.entities.asArray.filter(([_, components]) => components[PARENT_COMPONENT].id === id);
  }, [widget, id]);

  const name = useMemo(() => {
    const editorDataComponent = components[EDITOR_DATA_COMPONENT];

    return editorDataComponent?.name || 'Без имени';
  }, [components[EDITOR_DATA_COMPONENT].name]);

  const isLocked = useMemo(() => {
    const editorDataComponent = components[EDITOR_DATA_COMPONENT];

    return editorDataComponent?.isLocked;
  }, [components[EDITOR_DATA_COMPONENT].isLocked]);

  const isVisible = useMemo(() => {
    const editorDataComponent = components[EDITOR_DATA_COMPONENT];

    return editorDataComponent?.isVisible;
  }, [components[EDITOR_DATA_COMPONENT].isVisible]);

  const IconComponent = useMemo(() => {
    const editorDataComponent = components[EDITOR_DATA_COMPONENT];
    const iconName = editorDataComponent?.icon;

    return Icon[`${startCase(toLower(iconName))}Tool`] || null;
  }, [components[EDITOR_DATA_COMPONENT].icon]);

  const handleRenameStart = useCallback(() => {
    setIsRename(true);
  }, [])

  const handleRenameEnd = useCallback(() => {
    setIsRename(false);
  }, [])

  const handleToogleLock = useCallback(() => {
    editorDataS.toggleLock(id);
  }, [id, editorDataS]);

  const handleToogleVisibility = useCallback(() => {
    editorDataS.toggleVisibility(id);
  }, [id, editorDataS]);

  const handleRemove = useCallback(() => {
    widget.entities.remove(id);
    clearSelection();
  }, [id, clearSelection])

  const handleCopy = useCallback(() => {
    widget.entities.copy(id);
  }, [id])

  const handleRename = useCallback((name: string) => {
    editorDataS.rename(id, name);
    handleRenameEnd();
  }, [id, editorDataS]);

  return (
    <>
      <TreeNode
        ref={forwardedRef}
        id={id.description!}
        content={
          <div className={styles.widget_editor_outliner_item__content}>
            <IconComponent size={14} />
            {isRename
              ? <OutlinerRenameForm
                  onSubmit={handleRename}
                  onCancel={handleRenameEnd} />
              : name
            }
          </div>
        }
        actions={
          <>
            <button
              className={cn(
                styles.widget_editor_outliner_item__action_button,
                {
                  [styles['widget_editor_outliner_item__action_button--active']]: isLocked
                }
              )}
              onClick={handleToogleLock}>
              <Icon.Lock size={11} />
            </button>

            <button
              className={cn(
                styles.widget_editor_outliner_item__action_button,
                {
                  [styles['widget_editor_outliner_item__action_button--active']]: isVisible
                }
              )}
              onClick={handleToogleVisibility}>
              <Icon.Eye size={11} />
            </button>
          </>
        }
        {...rest}>
        {childs.map(child =>
          <WidgetEditorOutlinerItem
            key={child[0].description}
            entity={child} />
        )}
      </TreeNode>

      <WidgetEditorOutlinerItemContextMenu 
        targetRef={forwardedRef}
        onCopy={handleCopy}
        onRename={handleRenameStart}
        onRemove={handleRemove} />
    </>
  );

}))

WidgetEditorOutlinerItem.displayName = 'WidgetEditorOutlinerItem';
