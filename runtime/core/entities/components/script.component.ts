import { scriptProperties, text, uuid } from '../../utils';
import type { Nullable } from '../../types';
import type { IComponent, TComponentFactory } from '../component';

export const SCRIPT_COMPONENT = Symbol.for('script');

export type TScriptComponentProps = {

  id: Nullable<string>;

  name: Nullable<string>;

}

export interface IScriptComponent extends IComponent {

  id: ReturnType<typeof uuid>;

  name: ReturnType<typeof text>;

  properties: ReturnType<typeof scriptProperties>;

  serialize: () => [string, TScriptComponentProps];

}

export const scriptComponent: TComponentFactory<
  IScriptComponent,
  TScriptComponentProps
> = props => [SCRIPT_COMPONENT, {

  id: uuid(props.id),

  name: text(props.name || ''),

  properties: (() => {
    return scriptProperties([])
  })(),

  serialize() {
    return [SCRIPT_COMPONENT.description!, {
      id: this.id.value,
      name: this.name.value,
    }];
  },

}];
