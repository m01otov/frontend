import { action, makeObservable, observable, flow } from 'mobx';
import { Signal } from 'typed-signals';

import { IHttpService } from '@lukoil/scad-runtime-request';
import { INotificationsContext } from '@lukoil/scad-ide-notifications';
import type { ICodeEditorContext, TCodeEditorContextProps } from './interfaces';

const fileExtension = {
  js: 'javascript',
  css: 'css',
  json: 'json',
  text: 'text'
}

export const createCodeEditorContext = (
  http: IHttpService,
  notifications: INotificationsContext,
  props: TCodeEditorContextProps
) => makeObservable<ICodeEditorContext>({
  // TODO: Add language types
  // @ts-ignore
  language: fileExtension[props.file.extension],

  value: '',

  isLoading: true,

  onClose: new Signal(),

  *load() {
    try {
      const { data } = yield http.get(`/file-explorer/${props.file.id}/content`);

      if (data) {
        this.value = data;
      }
    } catch (error) {
      notifications.error('Ошибка');
    } finally {
      this.isLoading = false;
    }
  },

  *save() {
    try {
      const data = this.value;

      yield http.put(`/file-explorer/${props.file.id}/content`, {
        extension: 'js',
        content: data
      });

      notifications.success('Данные успешно сохранены')
    } catch (error) {
      notifications.error('Ошибка')
      console.error(error);
    }
  },

  setValue(value: string) {
    this.value = value;
  },

  closeEditor() {
    this.value = '';
    this.isLoading = false;
    this.onClose.emit();
  },

  get fileId() {
    return props.file.id;
  }

}, {
  value: observable,
  isLoading: observable,
  setValue: action.bound,
  save: flow.bound,
  load: flow.bound,
  closeEditor: action.bound,
})
