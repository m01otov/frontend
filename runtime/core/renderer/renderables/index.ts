import { type FC } from 'react';

import { SVGLineRendarable } from './svg/line';
import { SVGRectRendarable } from './svg/rect';
import { SVGEllipseRendarable } from './svg/ellipse';

import { HTMLContainerRendarable } from './html/container';
import { HTMLLabelRendarable } from './html/label';
import { HTMLInputRendarable } from './html/input';
import { HTMLButtonRendarable } from './html/button';
import { InstanceWidgetRendarable } from './instance/widget';

export const SVG_RENDERABLES_MAP: Record<string, FC<any> | null> = {
  'path': SVGLineRendarable,
  'rect': SVGRectRendarable,
  'ellipse': SVGEllipseRendarable,
}

export const HTML_RENDERABLES_MAP: Record<string, FC<any> | null> = {
  'div': HTMLContainerRendarable,
  'label': HTMLLabelRendarable,
  'input': HTMLInputRendarable,
  'button': HTMLButtonRendarable,
}

export const INSTANCE_RENDERABLES_MAP: Record<string, FC<any> | null> = {
  'widget': InstanceWidgetRendarable
}
