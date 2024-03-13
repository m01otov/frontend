import { action, makeObservable, observable } from 'mobx';
import { useInjection } from 'inversify-react';

import type { IFile } from '@lukoil/scad-file-explorer';
import { EFileExtension } from '@lukoil/scad-file-explorer/enums';
import { inject, type Nullable } from '@lukoil/scad-runtime-core';

import type { IIDEContext, IProjectsCollection, TIDEContextProps } from './interfaces';
import { createProjectsCollection } from './models/projects-collection.model';
import { HTTP_SERVICE_TOKEN } from '@lukoil/scad-runtime-request';
import { NOTIFICATION_CONTEXT_TOKEN } from '@lukoil/scad-ide-notifications';

export const IDE_CONTEXT_TOKEN = Symbol('ide');

export const createIDEContext = (props: TIDEContextProps) => makeObservable<IIDEContext>({
  projects: inject<IProjectsCollection>(createProjectsCollection, [
    HTTP_SERVICE_TOKEN,
    NOTIFICATION_CONTEXT_TOKEN
  ])(),
  
  projectId: null,

  assetEditor: null,

  file: null,

  setProjectId(value: Nullable<string>) {
    this.projectId = value;
  },

  setFile(value: IFile) {
    this.file = value;
    this.openAssetEditor(this.file.extension);
  },

  openAssetEditor(extension: EFileExtension) {
    this.assetEditor = props.assetEditors.get(extension);
  },

  closeAssetEditor() {
    this.file = null;
    this.assetEditor = null;
  },
}, {
  projectId: observable,
  file: observable.ref,
  assetEditor: observable,
  setProjectId: action.bound,
  setFile: action.bound,
  openAssetEditor: action.bound,
  closeAssetEditor: action.bound,
})

export const useIDEContext = () => {
  const settings = useInjection<IIDEContext>(IDE_CONTEXT_TOKEN);

  if (!settings) {
    throw new Error('You should call createIDEContext() and bind it to DI container before use')
  } 

  return settings;
}