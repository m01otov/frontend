import { uuid } from '../../utils';
import type { Nullable } from '../../types';
import type { IComponent, TComponentFactory } from '../component';

export const SOURCE_WIDGET_COMPONENT = Symbol.for('source-widget');

export type TSourceWidgetComponentProps = {

  id: Nullable<string>;

}

export interface ISourceWidgetComponent extends IComponent {

  id: ReturnType<typeof uuid>;

  serialize: () => [string, TSourceWidgetComponentProps];

}

export const sourceWidgetComponent: TComponentFactory<
  ISourceWidgetComponent,
  TSourceWidgetComponentProps
> = props => [SOURCE_WIDGET_COMPONENT, {

  id: uuid(props.id),

  serialize() {
    return [SOURCE_WIDGET_COMPONENT.description!, {
      id: this.id.value,
    }];
  },

}];
