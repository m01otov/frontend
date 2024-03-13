import { type PropsWithChildren, createContext, type FC, useContext, useMemo } from 'react';

import type { IFile } from '@lukoil/scad-file-explorer';
import { inject } from '@lukoil/scad-runtime-core';
import { HTTP_SERVICE_TOKEN } from '@lukoil/scad-runtime-request';
import { NOTIFICATION_CONTEXT_TOKEN } from '@lukoil/scad-ide-notifications';

import { createCodeEditorContext } from './context';
import { ICodeEditorContext } from './interfaces';

const CodeEditorContext = createContext<ICodeEditorContext>({} as ICodeEditorContext);

export type TCodeEditorContextProviderProps = PropsWithChildren<{
  onClose?: () => void;
  file: IFile;
}>;

export const CodeEditorContextProvider: FC<TCodeEditorContextProviderProps> = ({
  file,
  onClose,
  children
}) => {

  const contextInstance = useMemo(() => {
    const instance = inject<ICodeEditorContext>(createCodeEditorContext, [
      HTTP_SERVICE_TOKEN,
      NOTIFICATION_CONTEXT_TOKEN,
    ])({
      file,
    });

    onClose && instance.onClose.connect(onClose);

    return instance;
  }, []);

  return (
    <CodeEditorContext.Provider
      value={contextInstance}>
      {children}
    </CodeEditorContext.Provider>
  );
}

export const useCodeEditorContext = () => {
  const store = useContext(CodeEditorContext);
  
  if (!store) {
    throw new Error('useCodeEditorContext must be used within a CodeEditorContextProvider!');
  }

  return store;
}
