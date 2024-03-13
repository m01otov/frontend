import { type TComponentFactory, type IComponent } from '../component';
import { color } from '../../utils';

export const FILL_COMPONENT = Symbol.for('fill');

export type TFillComponentProps = {

  type: 'solid' | 'gradient',

  color: string;

  opacity: number;

}

export interface IFillComponent extends IComponent {
  color: ReturnType<typeof color>;

  serialize: () => [string, TFillComponentProps];
}

// TODO: add gradient info
export const fillComponent: TComponentFactory<
  IFillComponent,
  TFillComponentProps
> = props => [FILL_COMPONENT, {
  type: 'solid',
  
  color: color(props.color, props.opacity),

  serialize() {
    return [FILL_COMPONENT.description!, {
      type: this.type,
      color: this.color.hex,
      opacity: this.color.opacity
    }];
  },
}];
