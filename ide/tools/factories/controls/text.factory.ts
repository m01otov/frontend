import type {
  TDimensionsComponentProps,
  TEntityFactory,
  TParentComponentProps,
  TTransformComponentProps
} from '@lukoil/scad-runtime-core';
import {
  dimensionsComponent,
  editorDataComponent,
  elementComponent,
  textComponent,
  parentComponent,
  transformComponent,
  scriptComponent
} from '@lukoil/scad-runtime-core';
import { EEditorTool } from '../../enums';

type TTextFactoryProps = {
  parent: TParentComponentProps;

  transform: TTransformComponentProps;

  dimensions: TDimensionsComponentProps;
}

export const textFactory: TEntityFactory<TTextFactoryProps> = props => [
  parentComponent({
    id: props.parent?.id || null
  }),

  elementComponent<'html'>({
    type: 'html',
    shape: 'label',
    canHaveChildren: true
  }),

  transformComponent({
    ...props.transform,
  }),

  dimensionsComponent(props.dimensions),

  textComponent({
    color: '#000',
    opacity: 1,
    text: 'Текст',
    size: 16,
    lineHeight: 16
  }),

  editorDataComponent({
    name: 'Текст',
    isLocked: false,
    isVisible: true,
    icon: EEditorTool.TEXT
  }),

  scriptComponent({ id: null, name: null })
]