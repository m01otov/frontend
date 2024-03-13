import { useCallback, useEffect } from 'react';

import { useCanvasContext } from '../provider';

export const useMouseWheelZoom = (
  ref: React.RefObject<HTMLElement>
) => {
  const canvasContext = useCanvasContext();
  
  const handleMouseWheel = useCallback((event: WheelEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (!event.ctrlKey) return;

    const [minZoom, maxZoom] = canvasContext.options.zoom!.range;
    const zoomStep = canvasContext.options.zoom!.step;
    const normilizedDelta = Math.sign(event.deltaY);
    const newZoomValue = canvasContext.zoom - (normilizedDelta * zoomStep);
    const limitedZoomValue = Math.min(Math.max(newZoomValue, minZoom), maxZoom);

    canvasContext.updateZoom(Math.round(limitedZoomValue * 100) / 100);
  }, [canvasContext.options, canvasContext.zoom]);

  useEffect(() => {
    const { current: element } = ref;

    if (!element) return;

    element.addEventListener('wheel', handleMouseWheel);

    return () => {
      element.removeEventListener('wheel', handleMouseWheel);
    }
  }, [ref.current, handleMouseWheel]);

}
