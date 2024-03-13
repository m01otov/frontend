import { sourceWidgetComponent } from '.';
import { SOURCE_WIDGET_COMPONENT } from '.';
import { coordsComponent } from '.';
import { COORDS_COMPONENT } from './coords.component';
import { CORNER_RADIUS_COMPONENT, cornerRadiusComponent } from './corner-radius.component';
import { DIMENSIONS_COMPONENT, dimensionsComponent } from './dimensions.component';
import { EDITOR_DATA_COMPONENT, editorDataComponent } from './editor-data.component';
import { ELEMENT_COMPONENT, elementComponent } from './element.component';
import { FILL_COMPONENT, fillComponent } from './fill.component';
import { PARENT_COMPONENT, parentComponent } from './parent.component';
import { SCRIPT_COMPONENT, scriptComponent } from './script.component';
import { STROKE_COMPONENT, strokeComponent } from './stroke.component';
import { TEXT_COMPONENT, textComponent } from './text.component';
import { TRANSFORM_COMPONENT, transformComponent } from './transform.component';

export const COMPONENTS_MAP = {
  [CORNER_RADIUS_COMPONENT]: cornerRadiusComponent,

  [DIMENSIONS_COMPONENT]: dimensionsComponent,

  [EDITOR_DATA_COMPONENT]: editorDataComponent,

  [ELEMENT_COMPONENT]: elementComponent,

  [FILL_COMPONENT]: fillComponent,

  [PARENT_COMPONENT]: parentComponent,

  [SCRIPT_COMPONENT]: scriptComponent,

  [STROKE_COMPONENT]: strokeComponent,

  [TEXT_COMPONENT]: textComponent,

  [TRANSFORM_COMPONENT]: transformComponent,

  [COORDS_COMPONENT]: coordsComponent,

  [SOURCE_WIDGET_COMPONENT]: sourceWidgetComponent
}

export * from './corner-radius.component';
export * from './dimensions.component';
export * from './editor-data.component';
export * from './element.component';
export * from './fill.component';
export * from './parent.component';
export * from './script.component';
export * from './stroke.component';
export * from './transform.component';
export * from './text.component';
export * from './coords.component';
export * from './source-widget.component';