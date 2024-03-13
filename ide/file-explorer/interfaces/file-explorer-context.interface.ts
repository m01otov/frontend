import { type Nullable } from '@lukoil/scad-runtime-core';
import { type IDirectory, type IFile } from '.';
import { EFileExplorerItemType } from '../enums';
import { Signal } from 'typed-signals';

export type TFileExplorerContextProps = {

  projectId: string;

}

export interface IFileExplorerContext {

  entries: (IFile | IDirectory)[];

  activeEntry: Nullable<IFile | IDirectory>;

  searchQuery: string;

  isLoading: boolean;

  onOpenFile: Signal<(file: IFile) => void>;

  load: () => void;

  save: (name: string) => void;

  update: (id: string, data: any) => void;

  remove: (id: string) => void;

  open: (file: IFile) => void;

  addEmpty: (type: EFileExplorerItemType) => void;

  setActiveEntry: (id: string | null) => void;

  setSearchQuery: (value: string) => void;

  _getParentId: () => Nullable<string>;

  readonly roots: (IFile | IDirectory)[];

  readonly dirs:IDirectory[];

  readonly files: IFile[];

  readonly searchResult: IFile[];

  readonly searchQueryAsRegExp: string;
}
