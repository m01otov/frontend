import { action, computed, flow, makeObservable, observable } from 'mobx';
import { Signal } from 'typed-signals';

import type { INotificationsContext } from '@lukoil/scad-ide-notifications';
import type { IHttpService } from '@lukoil/scad-runtime-request';
import { EEditorTool } from '@lukoil/scad-ide-tools';
import { DIMENSIONS_COMPONENT, IDimensionsComponent, ITransformComponent, TEntity, TRANSFORM_COMPONENT } from '@lukoil/scad-runtime-core';
import type { IWidgetEditorContext, TWidgetEditorContextProps } from './interfaces';
import { getComponentFrom } from '@lukoil/scad-runtime-core';
import { createWidget } from './models/widget.model';

export const createWidgetEditorContext = (
  http: IHttpService,
  notifications: INotificationsContext,
  props: TWidgetEditorContextProps,
) => makeObservable<IWidgetEditorContext>({

  widget: createWidget(),

  activeToolId: props.defaultActiveToolId,

  selection: [],

  isLoading: true,

  onClose: new Signal(),

  setActiveTool(value: EEditorTool) {
    this.activeToolId = value;
    this.selection = [];
  },

  resetTool() {
    this.activeToolId = EEditorTool.SELECT;
  },

  makeSelection(value) {
    this.selection = value;
  },

  clearSelection() {
    this.selection = [];
  },

  *load(): unknown {
    try {
      const { data } = yield http.get(`/file-explorer/${props.file.id}/content`);

      if (data) {
        this.widget.entities.import(data?.entities);
      }
    } catch (error) {
      notifications.error('Ошибка')
    } finally {
      this.isLoading = false;
    }
  },

  *save() {
    try {
      if (!this.widget) return;

      const data: any = {
        boundingBox: this.widget.boundingBox,
        entities: this.widget.entities.export(),
      }

      yield http.put(`/file-explorer/${props.file.id}/content`, {
        extension: 'json',
        content: data
      });

      notifications.success('Данные успешно сохранены')
    } catch (error) {
      notifications.error('Ошибка')
      console.error(error);
    }
  },

  closeEditor() {
    this.widget.entities.clear();
    this.isLoading = false;
    this.onClose.emit();
  },

  get tools() {
    return props.tools;
  },

  get activeToolComponent() {
    return this.tools[this.activeToolId]?.component || null;
  },

  get selectedEntities(): TEntity[] {
    if (!this.widget) return [];
    return this.widget.entities.asArray.filter(([id]) => this.selection.includes(id.description!));
  },

  get selectionBoundingBox() {
    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;

    if (this.selection.length > 0) {
      for(let i = 0; i < this.selectedEntities.length; i++) {
        const entity = this.selectedEntities[i];
        const transform = getComponentFrom<ITransformComponent>(entity, TRANSFORM_COMPONENT);
        const dimensions = getComponentFrom<IDimensionsComponent>(entity, DIMENSIONS_COMPONENT);

        if (!transform || !dimensions) continue;

        if (i === 0) {
          minX = transform.position.x;
          maxX = transform.position.x + dimensions.width.value;
          minY = transform.position.y;
          maxY = transform.position.y + dimensions.height.value;
        }

        minX = Math.min(minX, transform.position.x);
        maxX = Math.max(maxX, transform.position.x + dimensions.width.value);
        minY = Math.min(minY, transform.position.y);
        maxY = Math.max(maxY, transform.position.y + dimensions.height.value);
      }
    }

    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
  }
  
}, {
  widget: observable,
  activeToolId: observable,
  isLoading: observable,
  selection: observable,
  setActiveTool: action.bound,
  resetTool: action.bound,
  makeSelection: action.bound,
  clearSelection: action.bound,
  load: flow.bound,
  save: flow.bound,
  closeEditor: action.bound,
  activeToolComponent: computed,
  selectedEntities: computed,
  selectionBoundingBox: computed 
})
