import { useCallback, useEffect } from 'react';

import { useCanvasContext } from '../provider';

export const useCanvasMousePosition = (
  ref: React.RefObject<HTMLElement>
) => {
  const { zoom, updateMousePosition } = useCanvasContext();

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const { current: element } = ref;

    if (!element) return;

    const elementRect = element.getBoundingClientRect();

    updateMousePosition([
      Math.floor((event.clientX - elementRect.x - (elementRect.width / 2)) / zoom),
      Math.floor((event.clientY - elementRect.y - (elementRect.height / 2)) / zoom)
    ]);
  }, [zoom])

  useEffect(() => {
    const { current: element } = ref;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [ref.current, handleMouseMove])
}
