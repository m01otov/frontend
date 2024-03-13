import { action, computed, makeObservable, observable } from 'mobx';

import { type Nullable } from '@lukoil/scad-runtime-core';
import { Icon } from '@lukoil/scad-ide-ui-core';
import { type IFile, type IDirectory, type IFileExplorerContext, type IFileExplorerItemDto } from '../interfaces';

export const createDirectory = (
  context: IFileExplorerContext,
  data: IFileExplorerItemDto
) => makeObservable<IDirectory>({
  context,

  ...data,

  isFolded: true,

  rename(value: string) {
    this.context.update(this.id, { name: value, type: this.type, parentId: this.parentId })

    this.name = value;
  },

  updateParent(value: Nullable<string>) {
    this.context.update(this.id, { name: this.name, type: this.type, parentId: value })

    this.parentId = value;
  },

  updateIsFolded(value: boolean) {
    this.isFolded = value;
  },

  get childs() {
    return context.entries.filter(
      entry => (entry as IDirectory).parentId === this.id
    ).sort((entryA: IFile | IDirectory, entryB: IFile | IDirectory) => {
      if (entryA.name < entryB.name) return -1;
      if (entryA.name > entryB.name) return 1;
      
      return 0;
    }).sort((entryA: IFile | IDirectory, entryB: IFile | IDirectory) => {
      if (entryA.type.toString() < entryA.type.toString()) return -1;
      if (entryA.type.toString() > entryB.type.toString()) return 1;
      
      return 0;
    })
  },

  get icon() {
    return (this.isFolded || this.childs.length === 0) ? Icon.FolderClose : Icon.FolderOpen;
  },

  get isNew() {
    return this.id.length === 0;
  },

  get isDir() {
    return true;
  }
}, {
  id: observable,
  name: observable,
  parentId: observable,
  isFolded: observable,
  updateIsFolded: action.bound,
  rename: action.bound,
  updateParent: action.bound,
  icon: computed,
  isNew: computed,
  childs: computed
})
