import { FC, useEffect, useRef } from 'react';

import { rectangle } from '@lukoil/scad-runtime-core';
import { useMouseDragRect } from '../../hooks/mouse-drag-rect.hook';
import { ToolFrame } from '../helpers/frame';

import styles from './styles.module.scss';

type TSelectToolProps = {
  target: React.RefObject<HTMLElement>;
  onComplete: (ids: string[]) => void;
}

export const SelectTool: FC<TSelectToolProps> = ({
  target,
  onComplete
}) => {
  const { isDrag, rect } = useMouseDragRect(target);
  const frame = useRef(rectangle(rect));

  useEffect(() => {
    frame.current.set(rect);
    const { current: element } = target;

    if (!element || !isDrag || frame.current.isEmpty) return;

    const elementRect = element.getBoundingClientRect();
    const selectableNodes = element.querySelectorAll('[data-selectable=true]');

    const overlappedElements = Array.from(selectableNodes).reduce<string[]>((out, node) => {
      const selectableNodeRect = node.getBoundingClientRect();

      const isOverlap = frame.current.overlaps({
        x: selectableNodeRect.x - elementRect.x,
        y: selectableNodeRect.y - elementRect.y,
        width: selectableNodeRect.width,
        height: selectableNodeRect.height
      })
  
      if (isOverlap) {
        const id = node.getAttribute('data-id');
        if (id) out.push(id);
      }
  
      return out;
    }, []);

    onComplete(overlappedElements);
  }, [target, isDrag, rect]);

  if (rect.width - rect.height === 0) return null;

  return (
    <ToolFrame
      target={target}
      rect={rect}
      shouldRender={isDrag}
      outlineOffset={0}>
      <div className={styles.select_tool__content} />
    </ToolFrame>
  );

}

SelectTool.displayName = 'SelectTool';
