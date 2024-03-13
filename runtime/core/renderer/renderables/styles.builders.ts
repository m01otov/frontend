import {
  ICornerRadiusComponent,
  IDimensionsComponent,
  IFillComponent,
  IStrokeComponent,
  ITransformComponent
} from '../../entities/components';

import { Nullable } from '../../types';

export const transformStyles = (transform: Nullable<ITransformComponent>) => {
  if (!transform) return {};

  return {
    '--position-x': `${transform.position.x}px`,
    '--position-y': `${transform.position.y}px`,
  }
}

export const dimensionsStyles  = (dimensions: Nullable<IDimensionsComponent>) => {
  if (!dimensions) return {};

  return {
    '--width': `${dimensions.width.value}px`,
    '--height': `${dimensions.height.value}px`,
  }
}

export const fillStyles  = (fill: Nullable<IFillComponent>, isHex: boolean = false) => {
  if (!fill) return {};

  return {
    '--color': isHex
      ? fill.color.hex
      : `rgba(${fill.color.rgba.join(',')})`,
  }
}

export const cornerRadiusStyles  = (cornerRadius: Nullable<ICornerRadiusComponent>) => {
  if (!cornerRadius) return {};

  return {
    '--corner-radius': (cornerRadius.values.value || [0, 0, 0, 0])
      .reduce((out, current) => out += `${current}px `, ''),
  }
}

export const strokeStyles = (stroke: Nullable<IStrokeComponent>) => {
  if (!stroke) return {};

  return {
    '--stroke': stroke.color.hex,
    '--stroke-width': stroke.width.value,
  }
}