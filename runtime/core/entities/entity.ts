import { action, computed, makeAutoObservable, makeObservable, observable, toJS } from 'mobx';
import { v4 } from 'uuid';

import { IComponent, TComponentFactoryResult } from './component';
import type { Nullable } from '../types';
import { PARENT_COMPONENT } from './components/parent.component';
import { EDITOR_DATA_COMPONENT } from './components/editor-data.component';
import { COMPONENTS_MAP } from '..';

export type TEntity = [symbol, Record<symbol, IComponent>];

export type TEntityId = TEntity[0];

export type TEntityComponents = TEntity[1];

export type TEntityFactory<T> = (data: T) => TComponentFactoryResult<IComponent>[];

export interface IEntitiesCollection {

  entries: Map<TEntityId, TEntityComponents>;

  create: (components: TComponentFactoryResult<IComponent>[]) => TEntityId;

  copy: (id: TEntityId) => void;

  remove: (id: TEntityId) => void;

  clear: () => void;

  getComponentOf: <T>(entityId: TEntityId, componentId: symbol) => Nullable<T>;

  import: (data: Record<string, Record<string, any>>) => void;

  export: () => Record<string, Record<string, any>>;

  readonly roots: TEntity[];

  readonly size: number;

  readonly asArray: TEntity[];

}

export const createEntitiesCollection = () => makeObservable<IEntitiesCollection>({

  entries: new Map(),

  create(rawComponents: TComponentFactoryResult<IComponent>[], id?: string): TEntityId {
    const components = rawComponents.reduce<TEntityComponents>((out, [name, data]) => {
      return { ...out, [name]: data }
    }, {});

    const entityId = Symbol.for(id || v4());

    this.entries.set(entityId, components);

    return entityId;
  },

  copy(id: TEntityId) {
    const components = this.entries.get(id)!;

    if (!components) return;

    const entityId = Symbol.for(v4());
    const rawComponents = toJS(components);

    rawComponents[EDITOR_DATA_COMPONENT].name = `${rawComponents[EDITOR_DATA_COMPONENT].name } - Копия`

    this.entries.set(entityId, makeAutoObservable(rawComponents));

    return entityId;
  },

  remove(id: TEntityId) {
    if (!this.entries.has(id)) return;

    this.entries.delete(id);    
  },

  clear() {
    this.entries.clear();
  },

  getComponentOf<T>(entityId: TEntityId, componentId: symbol): Nullable<T> {
    const components = this.entries.get(entityId);

    if (!components) return null;

    return components[componentId] as T || null;
  },

  import(data: Record<string, Record<string, any>>) {
    const result = Object.entries(data).map(([entityId, rawComponents]) => {
      const components = Object.entries(rawComponents).reduce((out, [key, value]) => {
        // @ts-ignore
        const component = COMPONENTS_MAP[Symbol.for(key)];

        if (component) {
          const [componentKey, componentData] = component(value);
          // @ts-ignore
          out[componentKey] = componentData;
        }

        return out;
      }, {});

      return [Symbol.for(entityId), components];
    });

    // @ts-ignore
    this.entries = new Map(result);
  },

  export() {
    return this.asArray.reduce((out, [id, components]) => {

      const serializedComponents = Object.getOwnPropertySymbols(components).reduce((out, key) => {
        // @ts-ignore
        const component = components[key];
        if (component && component.serialize) {
          const serialized = component.serialize();
          // @ts-ignore
          out[serialized[0]] = serialized[1];
        }


        return out;
      }, {})

      // @ts-ignore
      out[id.description!] = serializedComponents

      return out;
    }, {});
  },

  get size() {
    return this.entries.length;
  },

  get asArray() {
    return Array.from<TEntity>(this.entries);
  },

  get roots() {
    return this.asArray.filter(
      ([_, components]: TEntity) => components[PARENT_COMPONENT].id === null
    );
  }
}, {
  entries: observable,
  create: action.bound,
  copy: action.bound,
  remove: action.bound,
  import: action.bound,
  size: computed,
  asArray: computed,
  roots: computed
})
