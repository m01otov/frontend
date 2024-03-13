import { type PropsWithChildren, createContext, type FC, useContext, useMemo } from 'react';

import { inject } from '@lukoil/scad-runtime-core';
import { HTTP_SERVICE_TOKEN } from '@lukoil/scad-runtime-request';
import { createRuntimeContext } from './context';
import { IRuntimeContext } from './interfaces';

const RuntimeContext = createContext<IRuntimeContext>({} as IRuntimeContext);

export type TRuntimeContextProviderProps = PropsWithChildren<unknown>;

export const RuntimeContextProvider: FC<TRuntimeContextProviderProps> = ({
  children
}) => {

  const contextInstance = useMemo(() => {
    const instance = inject<IRuntimeContext>(createRuntimeContext, [
      HTTP_SERVICE_TOKEN,
    ])({});

    return instance;
  }, []);

  return (
    <RuntimeContext.Provider value={contextInstance}>
      {children}
    </RuntimeContext.Provider>
  );
}

export const useRuntimeContext = () => {
  const store = useContext(RuntimeContext);
  
  if (!store) {
    throw new Error('useRuntimeContext must be used within a RuntimeContextProvider!');
  }

  return store;
};
