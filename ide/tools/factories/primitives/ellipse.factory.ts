import type {
  TDimensionsComponentProps,
  TEntityFactory,
  TParentComponentProps,
  TTransformComponentProps,
  WithOptional
} from '@lukoil/scad-runtime-core';
import {
  dimensionsComponent,
  editorDataComponent,
  fillComponent,
  parentComponent,
  elementComponent,
  transformComponent,
  scriptComponent,
} from '@lukoil/scad-runtime-core';
import { EEditorTool } from '../../enums';

type TRectangleFactoryProps = {
  parent: WithOptional<TParentComponentProps, 'id'>;

  transform: TTransformComponentProps;

  dimensions: TDimensionsComponentProps;
}

export const ellipseFactory: TEntityFactory<TRectangleFactoryProps> = props => [
  parentComponent({
    id: props.parent.id || null
  }),

  elementComponent<'svg'>({
    type: 'svg',
    shape: 'ellipse',
    canHaveChildren: false
  }),

  transformComponent({
    ...props.transform,
  }),

  dimensionsComponent(props.dimensions),

  fillComponent({
    type: 'solid',
    color: '#f9f9f9',
    opacity: 1
  }),

  editorDataComponent({
    name: 'Эллипс',
    isLocked: false,
    isVisible: true,
    icon: EEditorTool.ELLIPSE
  }),

  scriptComponent({ id: null, name: null })
]
