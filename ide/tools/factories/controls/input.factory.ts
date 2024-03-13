import type {
  TDimensionsComponentProps,
  TEntityFactory,
  TParentComponentProps,
  TTransformComponentProps
} from '@lukoil/scad-runtime-core';

import {
  cornerRadiusComponent,
  dimensionsComponent,
  editorDataComponent,
  elementComponent,
  fillComponent,
  parentComponent,
  scriptComponent,
  strokeComponent,
  textComponent,
  transformComponent
} from '@lukoil/scad-runtime-core';
import { EEditorTool } from '../../enums';

type TInputFactoryProps = {
  parent: TParentComponentProps;

  transform: TTransformComponentProps;

  dimensions: TDimensionsComponentProps;
}

export const inputFactory: TEntityFactory<TInputFactoryProps> = props => [
  parentComponent({
    id: props.parent?.id || null
  }),

  elementComponent<'html'>({
    type: 'html',
    shape: 'input',
    canHaveChildren: false
  }),

  transformComponent({
    ...props.transform,
  }),

  dimensionsComponent(props.dimensions),

  cornerRadiusComponent({
    values: [5, 5, 5, 5],
    mixed: false,
  }),

  textComponent({
    color: '#000',
    opacity: 1,
    text: '',
    size: 16,
    lineHeight: 16
  }),

  fillComponent({
    type: 'solid',
    color: '#f9f9f9',
    opacity: 1
  }),

  strokeComponent({
    color: '#000',
    opacity: 1,
    width: 1,
    style: 'solid'
  }),

  editorDataComponent({
    name: 'Поле ввода',
    isLocked: false,
    isVisible: true,
    icon: EEditorTool.INPUT
  }),

  scriptComponent({ id: null, name: null })
]