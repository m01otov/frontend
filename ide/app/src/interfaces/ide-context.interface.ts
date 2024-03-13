import { IFile } from '@lukoil/scad-file-explorer';
import { EFileExtension } from '@lukoil/scad-file-explorer/enums';
import type { Nullable } from '@lukoil/scad-runtime-core';
import type { IProjectsCollection } from './projects-collection.interface';

export type TIDEContextProps = {
  assetEditors: Map<EFileExtension, unknown>;
}

export interface IIDEContext {
  projects: IProjectsCollection;

  projectId: Nullable<string>;

  file: Nullable<IFile>;

  assetEditor: unknown;

  setProjectId: (value: Nullable<string>) => void;

  setFile: (value: IFile) => void;

  openAssetEditor: (extension: EFileExtension) => void;

  closeAssetEditor: () => void;
}
