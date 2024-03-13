import type { Nullable } from '../types';
import type { TEntity } from './entity';

export interface IComponent extends Record<string, any> {
  serialize: () => [string, unknown];
}

export type TComponentFactoryResult<T extends IComponent> = [symbol, T];

export type TComponentFactory<
  T extends IComponent,
  U extends object = {}
> = (props: U) => TComponentFactoryResult<T>;

export const getComponentFrom = <T extends IComponent>(
  [_, components]: TEntity,
  componentId: symbol
): Nullable<T> => {
  return components[componentId] as T || null;
}
