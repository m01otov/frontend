import { type PropsWithChildren, forwardRef, useCallback, useRef, useState, Children, useMemo, cloneElement } from 'react';
import { startCase, toLower } from 'lodash';
import cn from 'classnames';

import { Icon, useForwardedRef } from '@lukoil/scad-ide-ui-core';
import { Popover } from '@lukoil/scad-ide-ui-core/components/popover';
import { EEditorTool } from '../../enums';
import { ToolsMenuItem } from './item';

import styles from './styles.module.scss';

type TToolsMenuGroupProps = PropsWithChildren<{
  activeToolId: EEditorTool;
  onClick: (id: EEditorTool) => void; 
}>;

export const ToolsMenuGroup = forwardRef<HTMLDivElement, TToolsMenuGroupProps>(({
  activeToolId,
  children,
  onClick
}, ref) => {
  const forwardedRef = useForwardedRef(ref);
  const groupItemsRef = useRef<HTMLDivElement>(null);
  const [isShowGroupItems, setIsShowGroupItems] = useState(false);
  // @ts-ignore
  const [selectedToolId, setSelectedToolId] = useState(children[0].props.id)

  const SelectedToolIcon = useMemo(() => {
    const iconName = `${startCase(toLower(selectedToolId))}Tool`;

    return Icon[iconName] || null;
  }, [selectedToolId]);

  const handleClick = useCallback(() => {
    onClick && onClick(selectedToolId)
  }, [selectedToolId, onClick]);

  const handleShowGroupItems = useCallback(() => {
    setIsShowGroupItems(true);
  }, []);

  const handleHideGroupItems = useCallback(() => {
    setIsShowGroupItems(false);
  }, []);

  return (
    <>
      <div
        ref={forwardedRef}
        className={cn(
            styles.tools_menu__group,
            {
              [styles['tools_menu__group--active']]: activeToolId === selectedToolId
            }
          )}>
          <ToolsMenuItem
            id={selectedToolId as EEditorTool}
            isActive={activeToolId === selectedToolId}
            onClick={handleClick}>
            <SelectedToolIcon size={14} />
          </ToolsMenuItem>
        <button
          className={styles.tools_menu__group_fold_button}
          onClick={handleShowGroupItems}>
          <Icon.ArrowFill size={8} />
        </button>
      </div>

      <Popover
        ref={groupItemsRef}
        show={isShowGroupItems}
        parent={forwardedRef.current}
        onClickAway={handleHideGroupItems}>
        {Children.map(children, child => {
          const { id, onClick, ...rest } = (child as JSX.Element).props;

          return (
            cloneElement(child as JSX.Element, {
              ...rest,
              id,
              onClick: () => {
                setSelectedToolId(id);
                onClick(id);
                handleHideGroupItems();
              }
            })  
          )
        })}
      </Popover>
    </>
  );
})

ToolsMenuGroup.displayName = 'ToolsMenuGroup';
