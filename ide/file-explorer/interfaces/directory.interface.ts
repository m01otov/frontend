import { type IFileExplorerItemModel } from '.';
import { type IFile } from './file.interface';

export interface IDirectory extends IFileExplorerItemModel {
  isFolded: boolean;

  updateIsFolded: (value: boolean) => void;

  readonly childs: (IFile | IDirectory)[];
}
