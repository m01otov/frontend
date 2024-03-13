import { CORNER_RADIUS_COMPONENT, DIMENSIONS_COMPONENT, FILL_COMPONENT, SCRIPT_COMPONENT, STROKE_COMPONENT, TEXT_COMPONENT, TRANSFORM_COMPONENT } from '@lukoil/scad-runtime-core';

import { TransformPropEditor } from './components/transform-prop-editor';
import { DimensionsPropEditor } from './components/dimensions-prop-editor';
import { CornerRadiusPropEditor } from './components/corner-radius-prop-editor';
import { FillPropEditor } from './components/fill-prop-editor';
import { StrokePropEditor } from './components/stroke-prop-editor';
import { TextPropEditor } from './components/text-prop-editor';
import { ScriptPropEditor } from './components/script-prop-editor';

export const PROPERTY_EDITORS = {

  [TRANSFORM_COMPONENT]: TransformPropEditor,

  [DIMENSIONS_COMPONENT]: DimensionsPropEditor,

  [CORNER_RADIUS_COMPONENT]: CornerRadiusPropEditor,

  [FILL_COMPONENT]: FillPropEditor,

  [STROKE_COMPONENT]: StrokePropEditor,

  [TEXT_COMPONENT]: TextPropEditor,

  [SCRIPT_COMPONENT]: ScriptPropEditor

}
