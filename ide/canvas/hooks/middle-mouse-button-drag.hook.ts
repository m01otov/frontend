import { useCallback, useEffect } from 'react';

import { useCanvasContext } from '../provider';

export const useMiddleMouseButtonDrag = (
  ref: React.RefObject<HTMLElement>
) => {
  const canvasContext = useCanvasContext();

  const handleMouseMove = useCallback((event: MouseEvent) => {
    canvasContext.updateOffset([
      Math.floor(canvasContext.offset.x + (event.movementX / canvasContext.zoom)),
      Math.floor(canvasContext.offset.y + (event.movementY / canvasContext.zoom))
    ]);
  }, [canvasContext.offset, canvasContext.zoom, canvasContext.updateOffset])

  const handleMouseUp = useCallback((_: MouseEvent) => {
    document.body.style.cursor = 'default';
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove])

  const handleMouseDown = useCallback((event: MouseEvent) => {
    if (event.button !== 1) return;

    event.stopPropagation();
    event.preventDefault();

    document.body.style.cursor = 'grabbing';
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, handleMouseUp])

  useEffect(() => {
    const { current: element } = ref;
    if (!element) return;

    element.addEventListener('mousedown', handleMouseDown);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [ref.current, handleMouseDown, handleMouseMove, handleMouseUp])
}
