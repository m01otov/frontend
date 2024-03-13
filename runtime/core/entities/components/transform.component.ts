import { toJS } from 'mobx';
import { type TVector2, vector2  } from '../../utils';
import type { IComponent, TComponentFactory } from '../component';

export const TRANSFORM_COMPONENT = Symbol.for('transform');

export type TTransformComponentProps = {

  position: TVector2;

}

export interface ITransformComponent extends IComponent {
  position: ReturnType<typeof vector2>;

  serialize: () => [string, TTransformComponentProps];
}

export const transformComponent: TComponentFactory<
  ITransformComponent,
  TTransformComponentProps
> = props => [TRANSFORM_COMPONENT, {
  position: vector2(props.position),

  serialize() {
    return [TRANSFORM_COMPONENT.description!, {
      position: toJS(this.position.value),
    }];
  },
}];
