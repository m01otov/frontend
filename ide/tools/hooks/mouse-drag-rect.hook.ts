import type { TRectangle } from '@lukoil/scad-runtime-core';
import { useMouseDragCoords } from './mouse-drag-coords.hook';
import { useMemo } from 'react';

type TMouseDragRectHookResult = {
  isDrag: boolean;
  rect: TRectangle;
}

const DEFAULT_RECT = { x: 0, y: 0, width: 0, height: 0 }

export const useMouseDragRect = (
  target: React.RefObject<HTMLElement>,
  onEnd?: (rect: TRectangle) => void
): TMouseDragRectHookResult => {

  const { isDrag, coords: { start, end } } = useMouseDragCoords(target, () => {
    onEnd && onEnd(rect || DEFAULT_RECT)
  });
  
  const rect = useMemo(() => {
    const [startX, startY] = start;
    const [endX, endY] = end;
    const newRect: TRectangle = { ...DEFAULT_RECT, x: startX, y: startY };

    if (endX >= startX) {
      newRect.width = endX - startX;
    }
    else if (endX < startX) {
      newRect.width = startX - endX;
      newRect.x = endX;
    }

    if (endY >= startY) {
      newRect.height = endY - startY;
    }
    else if (endY < startY) {
      newRect.height = startY - endY;
      newRect.y = endY;
    }

    return newRect;
  }, [start, end]);

  return { isDrag, rect }
}
