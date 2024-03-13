import { action, computed, flow, makeObservable, observable } from 'mobx';

import { IHttpService } from '@lukoil/scad-runtime-request';
import { INotificationsContext } from '@lukoil/scad-ide-notifications';
import { EFileExplorerItemType } from './enums';
import { createDirectory, createFile } from './models';
import type { IFileExplorerContext, IDirectory, IFile, TFileExplorerContextProps, IFileExplorerItemDto } from './interfaces';
import { Signal } from 'typed-signals';

export const createFileExplorerContext = (
  http: IHttpService,
  notifications: INotificationsContext,
  props: TFileExplorerContextProps
) => makeObservable<IFileExplorerContext>({
  entries: [],

  activeEntry: null,

  searchQuery: '',

  isLoading: false,

  onOpenFile: new Signal(),

  *load(): unknown {
    try {
      this.isLoading = true;

      const response: IFileExplorerItemDto[] = yield http.get(`/file-explorer/${props.projectId}`);

      if (!Array.isArray(response)) return;

      this.entries = response.reduce<(IFile | IDirectory)[]>((out, current) => {
        const model = current.type === EFileExplorerItemType.DIR
          ? createDirectory(this, current)
          : createFile(this, current)

        out.push(model);

        return out
      }, [])

    } catch (error) {
      notifications.error(`Ой! При загрузке проекта что-то пошло не так!`);
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  },

  *save(name: string): unknown {
    try {
      const empty = this.entries.find(entry => entry.id === '');

      if (!empty) return;

      if (name.length === 0) {
        this.entries = this.entries.filter(entry => entry.id !== empty.id);
        return;
      }

      const { type, parentId } = empty;
      const requestData = { name, type, parentId };
      const response = yield http.post(`/file-explorer/${props.projectId}`, requestData);

      empty.id = response.id
      empty.rename(name);
    } catch (error) {
      notifications.error(`Ой! При создании файла/папки что-то пошло не так!`);
      console.error(error);
    }
  },

  *update(id: string, data: any) {
    try {
      yield http.put(`/file-explorer/${id}`, data);

    } catch (error) {
      notifications.error(`Ой! При обновлении файла/папки что-то пошло не так!`);
      console.error(error);
    }
  },

  *remove(id: string) {
    try {
      if (id.length === 0) {
        this.entries = this.entries.filter(entry => entry.id.length !== 0);
      }

      const entryToDelete = this.entries.find(entry => entry.id === id);

      if (!entryToDelete) return;

      yield http.delete(`/file-explorer/${id}`);

      const getChildIds = (entries: (IFile | IDirectory)[]) => {
        return entries.reduce<string[]>((out, current) => {
          out.push(current.id);

          if (current.isDir) {
            out.push(...getChildIds((current as IDirectory).childs))
          }
          return out;
        }, []); 
      } 

      const ids = [entryToDelete.id, ...getChildIds((entryToDelete as IDirectory).childs || [])];

      this.entries = this.entries.filter(entry => !ids.includes(entry.id));
    } catch (error) {
      notifications.error(`Ой! При удалении что-то пошло не так!`);
      console.error(error);
    }
  },

  open(file: IFile) {
    this.onOpenFile.emit(file);
  },

  addEmpty(type: EFileExplorerItemType) {
    this.entries = this.entries.filter(entry => entry.id !== '');

    const parentId = this._getParentId();

    const data = { id: '', name: '', type, parentId };

    if (type === EFileExplorerItemType.FILE) {
      this.entries.push(createFile(this, data));

      const dir = this.dirs.find(dir => dir.id === parentId);
      if (dir) dir.updateIsFolded(false);
    }
    else {
      this.entries.unshift(createDirectory(this, data))
    }
  },
  
  setActiveEntry(id: string | null) {
    this.activeEntry = this.entries.find(entry => entry.id === id) || null; 
  },

  setSearchQuery(value: string) {
    this.searchQuery = value.trim();
  },

  _getParentId() {
    return this.activeEntry
      ? this.activeEntry.type === EFileExplorerItemType.FILE
          ? this.activeEntry.parentId
          : this.activeEntry.id
      : null;
  },

  get roots() {
    return this.entries.filter(
      (entry: IFile | IDirectory) => entry.parentId === null
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

  get dirs(): IDirectory[] {
    return this.entries.filter(
      (entry: IFile | IDirectory) => entry.type === EFileExplorerItemType.DIR
    ) as IDirectory[]
  },

  get files(): IFile[] {
    return this.entries.filter(
      (entry: IFile | IDirectory) => entry.type === EFileExplorerItemType.FILE
    ) as IFile[]
  },

  get searchResult(): IFile[] {
    return this.entries.reduce<IFile[]>((out, entry) => {
      if (entry.isDir) return out;
      
      try {
        const isMatch = entry.name.match(this.searchQueryAsRegExp)

        if (isMatch) {
          out.push(entry as IFile)
        }
      } catch(error) {
        console.warn(error)
      }

      return out;
    }, []);
  },

  get searchQueryAsRegExp(): string {
    return (
      this.searchQuery.replace(/[*.\\]/g, (match) => {
        switch(match) {
          case '*': return '(?:\\w+)';
          case '.': return '\\.';
          case '\\': return '\\\\';
          default: return match;
        }
      })
    )
  }

}, {
  entries: observable.shallow,
  activeEntry: observable.ref,
  searchQuery: observable,
  isLoading: observable,
  addEmpty: action.bound,
  open: action.bound,
  load: flow.bound,
  save: flow.bound,
  update: flow.bound,
  remove: flow.bound,
  setActiveEntry: action.bound,
  setSearchQuery: action.bound,
  roots: computed,
  dirs: computed,
  files: computed,
  searchResult: computed,
  searchQueryAsRegExp: computed,
})
