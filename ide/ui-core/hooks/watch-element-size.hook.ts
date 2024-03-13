import { useLayoutEffect, useMemo, useState } from 'react';

import { type TVector2 } from '@lukoil/scad-runtime-core';

export const useWatchElementSize = (
  ref: React.RefObject<HTMLElement>
): TVector2 => {
  const [size, setSize] = useState<TVector2>([0, 0]);

  const observer = useMemo(() => new ResizeObserver((entries: ResizeObserverEntry[]) => {
    if (entries[0]) {
      const { width, height } = entries[0].contentRect;

      setSize([ width, height ]);
    }
  }), []);

  useLayoutEffect(() => {
    if (!ref.current) return;

    observer.observe(ref.current, {
      box: 'border-box',
    });

    return () => observer.disconnect();
  }, [ref.current]);

  return size;
};
