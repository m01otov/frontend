import { FC, useRef } from 'react';

import { type TRectangle } from '@lukoil/scad-runtime-core';
import type { TToolBaseProps } from '../../../types';
import { useMouseDragRect } from '../../../hooks/mouse-drag-rect.hook';
import { ToolFrame } from '../../helpers/frame';
import { SizeIndicator } from '../../../components/helpers/size-indicator';
import { canvasFactory } from '../../../factories';

type TDrawChartsToolProps = {} & TToolBaseProps;

export const DrawChartsTool: FC<TDrawChartsToolProps> = ({
  target,
  onComplete
}) => {
  const frameRef = useRef<HTMLDivElement>(null);

  const { isDrag, rect } = useMouseDragRect(target, (rect: TRectangle) => {
    const { current: element } = target;

    if (!element || rect.width - rect.height === 0) return;

    const elementRect = element.getBoundingClientRect();

    const entityComponentsData = canvasFactory({
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
      </ToolFrame>

      <SizeIndicator
        target={frameRef}
        shouldRender={isDrag}
        width={rect.width}
        height={rect.height} />
    </>
  );

}


DrawChartsTool.displayName = 'DrawChartsTool';
