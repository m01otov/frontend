import { useCallback, useEffect, useState } from 'react';

import type { TVector2 } from '@lukoil/scad-runtime-core';

export type TMouseDragCoords = {
  start: TVector2;
  end: TVector2;
}

type TMouseDragCoordsHookResult = {
  isDrag: boolean;
  coords: TMouseDragCoords;
}

const DEFAULT_COORDS: TMouseDragCoords = {
  start: [0, 0],
  end: [0, 0]
}

export const useMouseDragCoords = (
  target: React.RefObject<HTMLElement>,
  onEnd?: (coords: TMouseDragCoords) => void
): TMouseDragCoordsHookResult => {
  const [coords, setCoords] = useState<TMouseDragCoords>(DEFAULT_COORDS);
  const [isDrag, setIsDrag] = useState(false);
  const [start, setStart] = useState<TVector2>([0, 0]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const { current: targetElement } = target;
    
    if (!isDrag || !targetElement) return;

    const { x: targetX, y: targetY } = targetElement.getBoundingClientRect();

    const currentX = event.clientX - targetX;
    const currentY = event.clientY - targetY;
    const [startX, startY] = start;

    setCoords({ start: [startX, startY], end: [currentX, currentY] });
  }, [target.current, isDrag, start]);

  const handleMouseUp = useCallback((_: MouseEvent) => {
    if (!isDrag) return;

    onEnd && onEnd(coords);

    setIsDrag(() => {
      setCoords(DEFAULT_COORDS);
      setStart([0, 0]);

      return false;
    });
  }, [coords, onEnd, isDrag]);

  const handleMouseDown = useCallback((event: MouseEvent) => {
    const { current: targetElement } = target;

    if (event.button !== 0 || !targetElement) return;

    const { x: targetX, y: targetY } = targetElement.getBoundingClientRect();

    setIsDrag(() => {
      const x = event.clientX - targetX;
      const y = event.clientY - targetY;

      setCoords({ start: [x, y], end: [x, y] });
      setStart([x, y]);

      return true;
    });
  }, [target.current]);

  const handleSelectStart = useCallback((event: Event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  useEffect(() => {
    const { current: element } = target;
    
    if (!element) return;

    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('selectstart', handleSelectStart);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('selectstart', handleSelectStart);

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [target.current, handleMouseDown, handleMouseMove, handleMouseUp]);

  return { isDrag, coords };
}