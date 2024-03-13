import {
  type PropsWithChildren,
  forwardRef,
  useMemo,
  Children,
  useCallback,
  ReactNode,
  cloneElement,
  type CSSProperties,
  type MouseEvent,
} from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { useTreeContext } from './provider';
import { Icon } from '../icon';
import { useForwardedRef} from '../..';

import styles from './styles.module.scss';

type TTreeNodeProps = PropsWithChildren<{
  id: string;
  content: ReactNode;
  actions?: ReactNode;
  onChildsToggle?: (value: boolean) => void;
  onDoubleClick?: (event: MouseEvent<HTMLDivElement>) => void;
} & Partial<Pick<HTMLElement, 'className'>>>

export const TreeNode = observer(forwardRef<HTMLDivElement, TTreeNodeProps>(({
  id,
  content,
  actions,
  // @ts-ignore
  deepnes = 1,
  children,
  onChildsToggle,
  onDoubleClick,
  className,
}, ref) => {

  const context = useTreeContext();
  const forwardedRef = useForwardedRef(ref);

  const hasChilds = useMemo(() => {
    return Children.count(children) > 0;
  }, [children]);

  const isShowChilds = useMemo(() => {
    return computed(() => !context.foldedIds.includes(id))
  }, [id, context.foldedIds]).get()

  const handleToggleChilds = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    
    if (isShowChilds) {
      context.fold(id);
    }
    else {
      context.unfold(id);
    }
    
    onChildsToggle && onChildsToggle(isShowChilds);
  }, [isShowChilds, context.fold, context.unfold, onChildsToggle]);

  const handleActionClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  }, [])

  const handleClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (event.detail === 2 && onDoubleClick) {
      onDoubleClick(event);
    };

    context.setActive(id);
  }, [id, context.setActive, onDoubleClick])

  return (
    <div 
      ref={forwardedRef}
      className={cn(className, styles.tree_node)}
      style={{
        '--deepnes': deepnes,
      } as CSSProperties}>
      
      <div 
        className={cn(
          styles.tree_node_summary,
          {
            [styles['tree_node_summary--active']]: context.activeId === id
          }
        )}
        onClick={handleClick}>
        <button
          className={cn(
            styles.tree_node_summary__toggle_childs_btn,
            {
              [styles['tree_node_summary__toggle_childs_btn--fold']]: isShowChilds
            }
          )}
          onClick={handleToggleChilds}
          disabled={!hasChilds}>
          <Icon.ArrowFill size={8} />
        </button>

        <div
          className={styles.tree_node_summary__content}>
          {content}
        </div>

        {actions &&
          <div
            className={styles.tree_node_summary__actions}
            onClick={handleActionClick}>
            {actions}
          </div>
        }
      </div>

      {(hasChilds && isShowChilds) &&
        <div className={styles.tree_node_sub_tree}>
          {Children.map(children, child =>
            cloneElement(child as JSX.Element, {
              ...(child as JSX.Element).props,
              deepnes: deepnes + 1
            })  
          )}
        </div>
      }
    </div>
  );
}))

TreeNode.displayName = 'TreeNode';
