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
  fillComponent,
  elementComponent,
  parentComponent,
  transformComponent,
  textComponent,
  strokeComponent,
  scriptComponent
} from '@lukoil/scad-runtime-core';
import { EEditorTool } from '../../enums';

type TchartsFactoryProps = {
  parent: TParentComponentProps;

  transform: TTransformComponentProps

  dimensions: TDimensionsComponentProps;
}

export const chartsFactory: TEntityFactory<TchartsFactoryProps> = props => [
  parentComponent({
    id: props.parent?.id || null
  }),

  elementComponent<'html'>({
    type: 'html',
    shape: 'button',
    canHaveChildren: true
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
    text: 'График',
    size: 16,
    lineHeight: 16
  }),

  fillComponent({
    type: 'solid',
    color: '#cfcfcf',
    opacity: 1
  }),

  strokeComponent({
    color: '#000',
    opacity: 1,
    width: 1,
    style: 'solid'
  }),

  editorDataComponent({
    name: 'График',
    isLocked: false,
    isVisible: true,
    icon: EEditorTool.BUTTON
  }),

  scriptComponent({ id: null, name: null })
]