import type { Nullable } from '../../types';
import { type IComponent, type TComponentFactory } from '../component';

export const PARENT_COMPONENT = Symbol.for('parent');

export type TParentComponentProps = {
  id: Nullable<string>;
}

export interface IParentComponent extends IComponent, TParentComponentProps {
  serialize: () => [string, TParentComponentProps];
}

export const parentComponent: TComponentFactory<
  IParentComponent,
  TParentComponentProps
> = props => [PARENT_COMPONENT, {
  id: props.id,

  serialize() {
    return [PARENT_COMPONENT.description!, {
      id: this.id
    }]
  },
}];
