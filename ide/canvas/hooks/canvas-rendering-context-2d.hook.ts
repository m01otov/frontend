import { useRef} from 'react';
import { useMount } from 'react-use';

export const useCanvasRenderingContext2D = (
  ref: React.RefObject<HTMLCanvasElement>
): CanvasRenderingContext2D | undefined => {
  const canvasContext2DRef = useRef<CanvasRenderingContext2D>();
  
  useMount(() => {
    const { current: canvasElement } = ref;

    if (!canvasElement) return;

    canvasContext2DRef.current = canvasElement.getContext('2d', { alpha: true })!;
  });

  return canvasContext2DRef.current
}
