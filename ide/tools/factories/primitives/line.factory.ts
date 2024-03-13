import type {
  TCoordsComponentProps,
  TDimensionsComponentProps,
  TEntityFactory,
  TParentComponentProps,
  TTransformComponentProps,
  WithOptional
} from '@lukoil/scad-runtime-core';
import {
  dimensionsComponent,
  editorDataComponent,
  elementComponent,
  strokeComponent,
  parentComponent,
  transformComponent,
  coordsComponent,
  scriptComponent,
} from '@lukoil/scad-runtime-core';
import { EEditorTool } from '../../enums';

type TLineFactoryProps = {
  parent: WithOptional<TParentComponentProps, 'id'>;

  transform: TTransformComponentProps;

  dimensions: TDimensionsComponentProps;

  coords: TCoordsComponentProps;
}

export const lineFactory: TEntityFactory<TLineFactoryProps> = props => [
  parentComponent({
    id: props.parent.id || null
  }),

  elementComponent<'svg'>({
    type: 'svg',
    shape: 'path',
    canHaveChildren: false
  }),

  transformComponent({
    ...props.transform,
  }),

  dimensionsComponent(props.dimensions),

  strokeComponent({
    color: '#f9f9f9',
    opacity: 1,
    width: 1,
    style: 'solid'
  }),

  editorDataComponent({
    name: 'Линия',
    isLocked: false,
    isVisible: true,
    icon: EEditorTool.LINE
  }),

  coordsComponent(props.coords),

  scriptComponent({ id: null, name: null })
]
