import { type TComponentFactory, type IComponent } from '../component';
import { color, integer, text } from '../../utils';

export const TEXT_COMPONENT = Symbol.for('text');

export type TTextComponentProps = {

  color: string;

  opacity: number;

  text: string;

  size: number;

  lineHeight: number;

}

export interface ITextComponent extends IComponent {
  color: ReturnType<typeof color>;

  text: ReturnType<typeof text>;

  size: ReturnType<typeof integer>;

  lineHeight: ReturnType<typeof integer>;

  serialize: () => [string, TTextComponentProps];
}

export const textComponent: TComponentFactory<
  ITextComponent,
  TTextComponentProps
> = props => [TEXT_COMPONENT, {
  
  color: color(props.color, props.opacity),

  text: text(props.text),

  size: integer(props.size),

  lineHeight: integer(props.lineHeight),

  serialize() {
    return [TEXT_COMPONENT.description!, {
      color: this.color.hex,
      opacity: this.color.opacity,
      text: this.text.value,
      size: this.size.value,
      lineHeight: this.lineHeight.value,
    }];
  },
}];
