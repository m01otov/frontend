import { integer } from '../../utils';
import type { IComponent, TComponentFactory } from '../component';

export const DIMENSIONS_COMPONENT = Symbol.for('dimensions');

export type TDimensionsComponentProps = {

  width: number;

  height: number;
  
}

export interface IDimensionsComponent extends IComponent {
  width: ReturnType<typeof integer>;

  height: ReturnType<typeof integer>;

  serialize: () => [string, TDimensionsComponentProps];
}

export const dimensionsComponent: TComponentFactory<
  IDimensionsComponent,
  TDimensionsComponentProps
> = props => [DIMENSIONS_COMPONENT, {
  width: integer(props.width),

  height: integer(props.height),

  serialize() {
    return [DIMENSIONS_COMPONENT.description!, {
      width: this.width.value,
      height: this.height.value,
    }];
  },
}];
