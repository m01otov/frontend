import { type IFileExplorerItemModel } from '.';
import { EFileExtension } from '../enums';

export interface IFile extends IFileExplorerItemModel {
  extension: EFileExtension;
}