import { color, integer } from '../../utils';
import type { IComponent, TComponentFactory } from '../component';

export const STROKE_COMPONENT = Symbol.for('stroke');

export type TStrokeComponentProps = {

  color: string;

  opacity: number;

  width: number;

  style: 'dotted' | 'dashed' | 'solid'

}

export interface IStrokeComponent extends IComponent {
  color: ReturnType<typeof color>;

  width: ReturnType<typeof integer>;

  style: 'dotted' | 'dashed' | 'solid';

  serialize: () => [string, TStrokeComponentProps];
}

export const strokeComponent: TComponentFactory<
  IStrokeComponent,
  TStrokeComponentProps
> = props => [STROKE_COMPONENT, {
  color: color(props.color, props.opacity),

  width: integer(props.width),

  style: props.style,

  serialize() {
    return [STROKE_COMPONENT.description!, {
      color: this.color.hex,
      opacity: this.color.opacity,
      width: this.width.value,
      style: this.style
    }];
  },
}];
