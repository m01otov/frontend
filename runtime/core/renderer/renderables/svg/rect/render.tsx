import { type CSSProperties, forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import { TRenderableProps } from '../../common.types';
import { getComponentFrom } from '../../../../entities/component';

import {
  TRANSFORM_COMPONENT,
  DIMENSIONS_COMPONENT,
  FILL_COMPONENT,
  CORNER_RADIUS_COMPONENT,
} from '../../../../entities/components';

import type {
  ITransformComponent,
  IDimensionsComponent,
  IFillComponent,
  ICornerRadiusComponent,
} from '../../../../entities/components';

import {
  cornerRadiusStyles,
  dimensionsStyles,
  fillStyles,
  transformStyles
} from '../../styles.builders';

import styles from './styles.module.scss';

type SVGRectRendarableProps = TRenderableProps & {
  isLocked?: boolean;
}

export const SVGRectRender = observer(forwardRef<SVGSVGElement, SVGRectRendarableProps>(({
  entity,
  isLocked
}, ref) => {
  const transform = getComponentFrom<ITransformComponent>(entity, TRANSFORM_COMPONENT);
  const dimensions = getComponentFrom<IDimensionsComponent>(entity, DIMENSIONS_COMPONENT);
  const fill = getComponentFrom<IFillComponent>(entity, FILL_COMPONENT);
  const cornerRadius = getComponentFrom<ICornerRadiusComponent>(entity, CORNER_RADIUS_COMPONENT);

  const style = {
    ...transformStyles(transform),
    ...dimensionsStyles(dimensions),
    ...fillStyles(fill),
    ...cornerRadiusStyles(cornerRadius)
  } as CSSProperties;

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={styles.svg_rect_renderable}
      style={style}
      data-selectable={!isLocked}
      data-id={entity[0].description}>
      <rect
        x={0}
        y={0}
        width={dimensions!.width.value}
        height={dimensions!.height.value} />
    </svg>
  )
}))

SVGRectRender.displayName = 'SVGRectRender';
