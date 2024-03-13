import {
  transformComponent,
  type TDimensionsComponentProps,
  type TEntityFactory,
  type TParentComponentProps,
  type TTransformComponentProps,
  dimensionsComponent,
  editorDataComponent,
  elementComponent,
  sourceWidgetComponent,
  TSourceWidgetComponentProps
} from '@lukoil/scad-runtime-core';

import {
  parentComponent,
} from '@lukoil/scad-runtime-core';

import { EEditorTool } from '../..';

type TWidgetInstanceProps = {
  parent: TParentComponentProps;

  sourceWidget: TSourceWidgetComponentProps;

  transform: TTransformComponentProps;

  dimensions: TDimensionsComponentProps;
}

export const widgetInstanceFactory: TEntityFactory<TWidgetInstanceProps> = props => [
  parentComponent({
    id: props.parent?.id || null
  }),

  sourceWidgetComponent({
    id: props.sourceWidget.id || null
  }),

  elementComponent<'instance'>({
    type: 'instance',
    shape: 'widget',
    canHaveChildren: false
  }),

  transformComponent({
    ...props.transform,
  }),

  dimensionsComponent(props.dimensions),

  editorDataComponent({
    name: 'Экземпляр виджета',
    isLocked: false,
    isVisible: true,
    icon: EEditorTool.WIDGET_INSTANCE
  }),
]
