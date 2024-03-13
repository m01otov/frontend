import { type FC, useMemo } from 'react';
import { createPortal } from 'react-dom';

import type { TRectangle } from '@lukoil/scad-runtime-core';
import { type TMouseDragCoords, useMouseDragCoords } from '../../../hooks/mouse-drag-coords.hook';
import type { TToolBaseProps } from '../../../types';
import { lineFactory } from '../../../factories';

import styles from './styles.module.scss';

type TDrawLineToolProps = {} & TToolBaseProps;

export const DrawLineTool: FC<TDrawLineToolProps> = ({
  target,
  onComplete
}) => {

  const { isDrag, coords: { start, end } } = useMouseDragCoords(target, ({ start, end }: TMouseDragCoords) => {
    const [startX, startY] = start;
    const [endX, endY] = end;
    const DEFAULT_RECT = { x: 0, y: 0, width: 0, height: 0 }
    const rect: TRectangle = { ...DEFAULT_RECT, x: startX, y: startY };

    if (endX >= startX) {
      rect.width = endX - startX;
    }
    else if (endX < startX) {
      rect.width = startX - endX;
      rect.x = endX;
    }

    if (endY >= startY) {
      rect.height = endY - startY;
    }
    else if (endY < startY) {
      rect.height = startY - endY;
      rect.y = endY;
    }

    const { current: element } = target;

    if (!element || rect.width - rect.height === 0) return;

    const elementRect = element.getBoundingClientRect();

    const entityComponentsData = lineFactory({
      parent: {
        id: null
      },
      transform: {
        position: [
          Math.floor(rect.x - (elementRect.width / 2)),
          Math.floor(rect.y - (elementRect.height / 2))
        ],
      },
      dimensions: {
        width: rect.width,
        height: rect.height
      },
      coords: {
        start: [
          startX - rect.x,
          startY - rect.y
        ],
        end: [
          endX - rect.x,
          endY - rect.y
        ]
      }
    })

    onComplete && onComplete(entityComponentsData)
  });

  const path = useMemo(() => {
    let startX = start[0];
    let startY = start[1];
    let endX = end[0];
    let endY = end[1];

    return `M${startX} ${startY} L${endX} ${endY}`;
  }, [start, end]);

  return isDrag && createPortal(
    <svg
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={styles.draw_line_tool__preview}>
      <path d={path} />
    </svg>
    , target.current || document.body
  );

}

DrawLineTool.displayName = 'DrawLineTool';
