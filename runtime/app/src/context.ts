import { flow, makeObservable, observable } from 'mobx';

import { IHttpService } from '@lukoil/scad-runtime-request';
import type { IRuntimeContext, TRuntimeContextProps } from './interfaces';
import { createEntitiesCollection } from '@lukoil/scad-runtime-core';

export const createRuntimeContext = (
  http: IHttpService,
  props: TRuntimeContextProps
) => makeObservable<IRuntimeContext>({
  mainScreen: createEntitiesCollection(),

  isLoading: false,

  *loadProject(id: string) {
    try {
      this.isLoading = true;

      const response: any[] = yield http.get(`/file-explorer/${id}`);

      if (!Array.isArray(response)) return;

      const screen = response.find(({ name }) => name.includes('app.scrn'))
      
      if (!screen) {
        throw Error('There is no main scren');
      }

      yield this.loadScreenContent(screen.id)

    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  },

  *loadScreenContent(id: string) {
    try {
      const { data } = yield http.get(`/file-explorer/${id}/content`);

      if (data) {
        this.mainScreen.import(data);
      }

    } catch (error) {
      console.error('Ошибка')
    } finally {
      this.isLoading = false;
    }
  }
}, {
  isLoading: observable,
  loadProject: flow.bound,
  loadScreenContent: flow.bound,
})
