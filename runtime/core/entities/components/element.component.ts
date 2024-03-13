import type { IComponent, TComponentFactoryResult } from '../component';

export const ELEMENT_COMPONENT = Symbol.for('element');

export type TElementShapeMap = {
  html: 'div' | 'label' | 'input' | 'button';

  svg: 'rect' | 'ellipse' | 'path';

  instance: 'widget';
}

export type TElementType = keyof TElementShapeMap;

export type TElementComponentProps<T extends TElementType> = {

  type: TElementType;

  shape: TElementShapeMap[T];

  canHaveChildren: boolean;

}

export interface IElementComponent<T extends TElementType> extends IComponent {
  type: TElementType;

  shape: TElementShapeMap[T];

  canHaveChildren: boolean;

  serialize: () => [string, TElementComponentProps<T>];
}

export function elementComponent<T extends TElementType>(
  props: TElementComponentProps<T>
): TComponentFactoryResult<IElementComponent<T>> {
  return [ELEMENT_COMPONENT, {
    type: props.type,

    shape: props.shape,
  
    canHaveChildren: props.canHaveChildren,

    serialize() {
      return [ELEMENT_COMPONENT.description!, {
        type: this.type,
        shape: this.shape,
        canHaveChildren: this.canHaveChildren
      }];
    },
  }]
}
