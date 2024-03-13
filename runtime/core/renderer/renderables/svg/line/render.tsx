import { type CSSProperties, forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import { TRenderableProps } from '../../common.types';
import { getComponentFrom } from '../../../../entities/component';

import {
  TRANSFORM_COMPONENT,
  DIMENSIONS_COMPONENT,
  STROKE_COMPONENT,
  COORDS_COMPONENT,
} from '../../../../entities/components';

import type {
  ITransformComponent,
  IDimensionsComponent,
  IStrokeComponent,
  ICoordsComponent,
} from '../../../../entities/components';

import {
  dimensionsStyles,
  strokeStyles,
  transformStyles
} from '../../styles.builders';

import styles from './styles.module.scss';

type SVGLineRenderProps = TRenderableProps & {
  isLocked?: boolean;
}

export const SVGLineRender = observer(forwardRef<SVGSVGElement, SVGLineRenderProps>(({
  entity,
  isLocked
}, ref) => {
  const transform = getComponentFrom<ITransformComponent>(entity, TRANSFORM_COMPONENT);
  const dimensions = getComponentFrom<IDimensionsComponent>(entity, DIMENSIONS_COMPONENT);
  const stroke = getComponentFrom<IStrokeComponent>(entity, STROKE_COMPONENT);
  const coords = getComponentFrom<ICoordsComponent>(entity, COORDS_COMPONENT);

  const style = {
    ...transformStyles(transform),
    ...dimensionsStyles(dimensions),
    ...strokeStyles(stroke),
  } as CSSProperties;

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={styles.svg_line_renderable}
      style={style}
      data-selectable={!isLocked}
      data-id={entity[0].description}>
      <path d={`M${coords?.start.x} ${coords?.start.y} L${coords?.end.x} ${coords?.end.y}`} />
    </svg>
  )
}))

SVGLineRender.displayName = 'SVGLineRender';
