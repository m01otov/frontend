import { toJS } from 'mobx';
import { type TVector2, vector2  } from '../../utils';
import type { IComponent, TComponentFactory } from '../component';

export const COORDS_COMPONENT = Symbol.for('coords');

export type TCoordsComponentProps = {

  start: TVector2;

  end: TVector2;

}

export interface ICoordsComponent extends IComponent {
  start: ReturnType<typeof vector2>;

  end: ReturnType<typeof vector2>;

  serialize: () => [string, TCoordsComponentProps];
}

export const coordsComponent: TComponentFactory<
  ICoordsComponent,
  TCoordsComponentProps
> = props => [COORDS_COMPONENT, {
  start: vector2(props.start),

  end: vector2(props.end),

  serialize() {
    return [COORDS_COMPONENT.description!, {
      start: toJS(this.start.value),
      end: toJS(this.end.value),
    }];
  },
}];
