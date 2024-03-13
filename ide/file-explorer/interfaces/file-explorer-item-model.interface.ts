import { FC } from 'react';

import { type Nullable } from '@lukoil/scad-runtime-core';
import { type IFileExplorerContext, type IFileExplorerItemDto } from '.';

export interface IFileExplorerItemModel extends IFileExplorerItemDto {
  context: IFileExplorerContext;

  rename: (value: string) => void;

  updateParent: (value: Nullable<string>) => void;

  readonly icon: FC<any>;

  readonly isNew: boolean;

  readonly isDir?: boolean;
}
