import { action, computed, makeObservable, observable } from 'mobx';

import { type Nullable } from '@lukoil/scad-runtime-core';
import { Icon } from '@lukoil/scad-ide-ui-core';
import { EFileExtension } from '../enums';
import { type IFileExplorerContext, type IFileExplorerItemDto } from '../interfaces';
import { IFile } from '../interfaces/file.interface';

const getExtension = (fileName: string) => {
  if (!fileName) return undefined;

  const match = /\.([^.]+)$/.exec(fileName);

  return match ? match[1] as EFileExtension : undefined
}

export const createFile = (
  context: IFileExplorerContext,
  { name, ...rest }: IFileExplorerItemDto
) => makeObservable<IFile>({
  context,
  
  name,

  extension: getExtension(name) || EFileExtension.UNKNOWN,
  
  ...rest,

  rename(value: string) {
    const extension = getExtension(value);

    this.context.update(this.id, { name: value, type: this.type, parentId: this.parentId })

    this.name = value;
    this.extension = extension || EFileExtension.UNKNOWN;
  },

  updateParent(value: Nullable<string>) {
    this.context.update(this.id, { name: this.name, type: this.type, parentId: value })

    this.parentId = value;
  },

  get icon() {
    switch(this.extension) {
      case EFileExtension.CSS:
        return Icon.CssFile;
      case EFileExtension.JS:
        return Icon.JsFile;
      case EFileExtension.WGT:
        return Icon.Widget;    
      case EFileExtension.SCRN:
        return Icon.Screen;
      default:
        return Icon.File;
    }
  },

  get isNew() {
    return this.id.length === 0;
  }
}, {
  id: observable,
  name: observable,
  type: observable,
  extension: observable,
  parentId: observable,
  rename: action.bound,
  updateParent: action.bound,
  icon: computed,
  isNew: computed
})
