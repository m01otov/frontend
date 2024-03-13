import { useCallback } from 'react';

import type { KeyboardEvent, DependencyList } from 'react';

export function useKeyInteraction(
  keys: Record<string, (event: KeyboardEvent<HTMLElement>) => void>,
  deps: DependencyList,
) {
  return useCallback((event: KeyboardEvent<HTMLElement>) => {
    const callback = keys[event.key];
    if (callback) {
      event.preventDefault();
      event.stopPropagation();

      callback(event);
    }
  }, [keys, deps]);
};