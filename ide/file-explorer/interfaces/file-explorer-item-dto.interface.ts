import { type Nullable } from '@lukoil/scad-runtime-core';
import { type EFileExplorerItemType } from '../enums';

export interface IFileExplorerItemDto {
  id: string;
  
  name: string;

  type: EFileExplorerItemType;

  parentId: Nullable<string>;
}
