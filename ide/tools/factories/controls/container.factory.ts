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
  transformComponent
} from '@lukoil/scad-runtime-core';
import { EEditorTool } from '../../enums';

type TContainerFactoryProps = {
  parent: TParentComponentProps;

  transform: TTransformComponentProps;

  dimensions: TDimensionsComponentProps;
}

export const containerFactory: TEntityFactory<TContainerFactoryProps> = props => [
  parentComponent({
    id: props.parent?.id || null
  }),

  elementComponent<'html'>({
    type: 'html',
    shape: 'div',
    canHaveChildren: true
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
    name: 'Контейнер',
    isLocked: false,
    isVisible: true,
    icon: EEditorTool.CONTAINER
  }),

  scriptComponent({ id: null, name: null })
]
