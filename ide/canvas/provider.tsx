import { type PropsWithChildren, createContext, type FC, useContext, useMemo } from 'react';

import { TVector2 } from '@lukoil/scad-runtime-core';
import { createCanvasContext } from './context';
import { ICanvasContext } from './interfaces';

const CanvasContext = createContext<ICanvasContext>({} as ICanvasContext);

export type TCanvasContextProviderProps = PropsWithChildren<ICanvasContext['options'] & {
  onMousePositionChange?: (value: TVector2) => void;
  onOffsetChange?: (value: TVector2) => void;
  onZoomChange?: (value: number) => void;
}>;

const DEFAULT_OPTIONS = {
  ruler: {
    segmentSize: 100,
    segmentDivideEach: 10,
    labelFont: '500 10px Montserrat',
    labelColor: '#787d82'
  },
  zoom: {
    // range: [0.5, 3] as TVector2,
    range: [1, 1] as TVector2,
    step: 0.1
  }
}

export const CanvasContextProvider: FC<TCanvasContextProviderProps> = ({
  children,
  onMousePositionChange,
  onOffsetChange,
  onZoomChange,
  ...options
}) => {

  const contextInstance = useMemo(() => {
    const instance = createCanvasContext({ ...DEFAULT_OPTIONS, ...options });

    onMousePositionChange && instance.onMousePositionChange.connect(onMousePositionChange);
    onOffsetChange && instance.onOffsetChange.connect(onOffsetChange);
    onZoomChange && instance.onZoomChange.connect(onZoomChange);

    return instance;
  }, []);

  return (
    <CanvasContext.Provider value={contextInstance}>
      {children}
    </CanvasContext.Provider>
  );
}

export const useCanvasContext = () => {
  const store = useContext(CanvasContext);
  
  if (!store) {
    throw new Error('useCanvasContext must be used within a CanvasContextProvider!');
  }

  return store;
};
