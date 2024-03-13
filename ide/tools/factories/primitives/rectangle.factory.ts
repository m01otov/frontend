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
  parentComponent,
  transformComponent,
  elementComponent,
  scriptComponent,
} from '@lukoil/scad-runtime-core';
import { EEditorTool } from '../../enums';

type TRectangleFactoryProps = {
  parent: TParentComponentProps;

  transform: TTransformComponentProps;

  dimensions: TDimensionsComponentProps;
}

export const rectangleFactory: TEntityFactory<TRectangleFactoryProps> = props  => [
  parentComponent({
    id: props.parent?.id || null
  }),

  elementComponent<'svg'>({
    type: 'svg',
    shape: 'rect',
    canHaveChildren: false
  }),

  transformComponent({
    ...props.transform,
  }),

  dimensionsComponent(props.dimensions),

  cornerRadiusComponent({
    values: [0, 0, 0, 0],
    mixed: false,
  }),

  fillComponent({
    type: 'solid',
    color: '#f9f9f9',
    opacity: 1
  }),

  editorDataComponent({
    name: 'Прямоугольник',
    isLocked: false,
    isVisible: true,
    icon: EEditorTool.RECT
  }),

  scriptComponent({ id: null, name: null })
]
