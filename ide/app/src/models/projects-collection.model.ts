import { makeObservable, observable, flow, computed } from 'mobx';

import type { IProject, IProjectDto, IProjectsCollection } from '@root/interfaces';
import type { IHttpService } from '@lukoil/scad-runtime-request';
import type { INotificationsContext } from '@lukoil/scad-ide-notifications';

import { createProject } from './project.model';

export const createProjectsCollection = (
  http: IHttpService,
  notifications: INotificationsContext,
) => makeObservable<IProjectsCollection>({

  entries: new Map(),

  isLoading: false,
  
  *load() {
    try {
      this.isLoading = true;

      const response: IProjectDto[] = yield http.get('/projects')

      this.entries = new Map(
        response.reduce<[string, IProject][]>((out, current) => {
          out.push([current.id, createProject(current)])
          
          return out
        }, [])
      )
    } catch(error) {
      notifications.error('Ошибка')
      console.error(error)
    } finally {
      this.isLoading = false;
    }
  },

  *create(value) {
    try {
      const response: IProjectDto = yield http.post('/projects', value)

      this.entries.set(response.id, createProject(response))
    } catch(error) {
      notifications.error('Ошибка')
      console.error(error)
    }
  },

  *update(id, value) {
    try {
      const project = this.entries.get(id)
      
      if (!project) return;

      const { id: projectId, ...rest }: IProjectDto = yield http.put(`/projects/${id}`, value)

      project.update(rest)
    } catch(error) {
      notifications.error('Ошибка')
      console.error(error)
    }
  },

  *remove(id) {
    try {
      yield http.delete(`/projects/${id}`)

      this.entries.delete(id)
    } catch(error) {
      notifications.error('Ошибка')
      console.error(error)
    }
  },

  get asArray() {
    return Array.from<[string, IProject]>(this.entries)
  }

}, {
  entries: observable,
  isLoading: observable,
  load: flow.bound,
  create: flow.bound,
  remove: flow.bound,
  update: flow.bound,
  asArray: computed,
})