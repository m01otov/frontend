import { type PropsWithChildren, type FC, createContext, useContext, useMemo } from 'react';

import type { Nullable } from '@lukoil/scad-runtime-core';
import { type ITreeContext, type TTreeContextProps, createTreeContext } from './context';

const TreeContext = createContext<ITreeContext>({} as ITreeContext);

export type TTreeContextProviderProps = PropsWithChildren<{
  onActiveNodeChange?: (nodeId: Nullable<string>) => void;
}> & TTreeContextProps;

const DEFAULT_PROPS = {
  withIndentLines: false
}

export const TreeContextProvider: FC<TTreeContextProviderProps> = ({
  children,
  onActiveNodeChange,
  ...options 
}) => {

  const contextInstance = useMemo(() => {
    const instance = createTreeContext({ ...DEFAULT_PROPS, ...options });

    onActiveNodeChange && instance.onActiveNodeChange.connect(onActiveNodeChange);

    return instance;
  }, []);

  return (
    <TreeContext.Provider value={contextInstance}>
      {children}
    </TreeContext.Provider>
  );
}

export const useTreeContext = () => {
  const store = useContext(TreeContext);
  
  if (!store) {
    throw new Error('useTreeContext must be used within a TreeContextProvider!');
  }

  return store;
};
