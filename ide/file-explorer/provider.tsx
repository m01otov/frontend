import { type PropsWithChildren, createContext, type FC, useContext, useMemo } from 'react';

import { inject } from '@lukoil/scad-runtime-core';
import { HTTP_SERVICE_TOKEN } from '@lukoil/scad-runtime-request';
import { NOTIFICATION_CONTEXT_TOKEN } from '@lukoil/scad-ide-notifications';
import { IFile, type IFileExplorerContext } from './interfaces';
import { createFileExplorerContext } from './context';

const FileExplorerContext = createContext<IFileExplorerContext>({} as IFileExplorerContext);

export type TFileExplorerContextProviderProps = PropsWithChildren<{
  projectId: string;
  onOpenFile?: (file: IFile) => void;
}>;

export const FileExplorerContextProvider: FC<TFileExplorerContextProviderProps> = ({
  projectId,
  onOpenFile,
  children
}) => {

  const contextInstance = useMemo(() => {
    const instance = inject<IFileExplorerContext>(createFileExplorerContext, [
      HTTP_SERVICE_TOKEN,
      NOTIFICATION_CONTEXT_TOKEN,
    ])({
      projectId
    });

    onOpenFile && instance.onOpenFile.connect(onOpenFile);

    return instance;
  }, []);

  return (
    <FileExplorerContext.Provider value={contextInstance}>
      {children}
    </FileExplorerContext.Provider>
  );
}

export const useFileExplorerContext = () => {
  const store = useContext(FileExplorerContext);
  
  if (!store) {
    throw new Error('useFileExplorerContext must be used within a FileExplorerContextProvider!');
  }

  return store;
};
