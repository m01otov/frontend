import { toJS } from 'mobx';
import { type TVector4, vector4 } from '../../utils';
import type { IComponent, TComponentFactory } from '../component';

export const CORNER_RADIUS_COMPONENT = Symbol.for('cornerRadius');

export type TCornerRadiusComponentProps = {

  values: TVector4;

  mixed: boolean;
  
}

export interface ICornerRadiusComponent extends IComponent {
  values: ReturnType<typeof vector4>;

  mixed: boolean;

  serialize: () => [string, TCornerRadiusComponentProps];
}

export const cornerRadiusComponent: TComponentFactory<
  ICornerRadiusComponent,
  TCornerRadiusComponentProps
> = props => [CORNER_RADIUS_COMPONENT, {
  values: vector4(props.values),

  mixed: props.mixed,

  serialize() {
    return [CORNER_RADIUS_COMPONENT.description!, {
      values: toJS(this.values.value),
      mixed: this.mixed
    }];
  },
}];
