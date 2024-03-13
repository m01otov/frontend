import { forwardRef, useLayoutEffect } from 'react';

import { IFile, IFileExplorerItemDto } from './interfaces';
import { FileExplorerContextProvider, useFileExplorerContext, type TFileExplorerContextProviderProps } from './provider';
import { FileExplorerSearch } from './components/search';
import { FileExplorerToolbar } from './components/toolbar';
import { FileExplorerTree } from './components/tree';

import styles from './styles.module.scss';

type TFileExplorerProps = {} & Omit<TFileExplorerContextProviderProps, 'children'>;

export const FileExplorerContent = forwardRef<HTMLDivElement, unknown>((_, ref) => {

  const { load } = useFileExplorerContext();

  useLayoutEffect(() => {
    load()
  }, [load])

  return (
    <div 
      ref={ref}
      className={styles.file_explorer}>
      <FileExplorerSearch />

      <FileExplorerToolbar />

      <FileExplorerTree />
    </div>
  )
})

export const FileExplorer = forwardRef<HTMLDivElement, TFileExplorerProps>(({
  ...rest
}, ref) => (
  <FileExplorerContextProvider {...rest}>
    <FileExplorerContent ref={ref} />
  </FileExplorerContextProvider>
)) 

FileExplorerContent.displayName = 'FileExplorerContent';
FileExplorer.displayName = 'FileExplorer';

export type { IFile, IFileExplorerItemDto };
