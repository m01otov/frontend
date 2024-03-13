import { FC, useRef } from 'react';

import { type TRectangle } from '@lukoil/scad-runtime-core';
import type { TToolBaseProps } from '../../../types';
import { useMouseDragRect } from '../../../hooks/mouse-drag-rect.hook';
import { ToolFrame } from '../../helpers/frame';
import { rectangleFactory } from '../../../factories';

import styles from './styles.module.scss';

type TDrawRectToolProps = {} & TToolBaseProps;

export const DrawRectTool: FC<TDrawRectToolProps> = ({
  target,
  onComplete
}) => {
  const frameRef = useRef<HTMLDivElement>(null);

  const { isDrag, rect } = useMouseDragRect(target, (rect: TRectangle) => {
    const { current: element } = target;

    if (!element || rect.width - rect.height === 0) return;

    const elementRect = element.getBoundingClientRect();

    const entityComponentsData = rectangleFactory({
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
      }
    })

    onComplete && onComplete(entityComponentsData);
  });

  if (rect.width - rect.height === 0) return null;

  return (
    <>
      <ToolFrame
        ref={frameRef}
        target={target}
        rect={rect}
        shouldRender={isDrag}>
        <div className={styles.draw_rect_tool__preview} />
      </ToolFrame>

    </>
  );

}

DrawRectTool.displayName = 'DrawRectTool';
