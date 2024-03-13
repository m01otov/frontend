import { type CSSProperties, forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import { TRenderableProps } from '../../common.types';
import { getComponentFrom } from '../../../../entities/component';

import {
  TRANSFORM_COMPONENT,
  DIMENSIONS_COMPONENT,
  FILL_COMPONENT,
} from '../../../../entities/components';

import type {
  ITransformComponent,
  IDimensionsComponent,
  IFillComponent,
} from '../../../../entities/components';

import {
  dimensionsStyles,
  fillStyles,
  transformStyles
} from '../../styles.builders';

import styles from './styles.module.scss';

type SVGEllipseRenderProps = TRenderableProps & {
  isLocked?: boolean;
}

export const SVGEllipseRender = observer(forwardRef<SVGSVGElement, SVGEllipseRenderProps>(({
  entity,
  isLocked
}, ref) => {
  const transform = getComponentFrom<ITransformComponent>(entity, TRANSFORM_COMPONENT);
  const dimensions = getComponentFrom<IDimensionsComponent>(entity, DIMENSIONS_COMPONENT);
  const fill = getComponentFrom<IFillComponent>(entity, FILL_COMPONENT);

  const style = {
    ...transformStyles(transform),
    ...dimensionsStyles(dimensions),
    ...fillStyles(fill, true),
  } as CSSProperties;

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={styles.svg_ellipse_renderable}
      style={style}
      data-selectable={!isLocked}
      data-id={entity[0].description}>
      <ellipse
        cx={dimensions!.width.value / 2}
        cy={dimensions!.height.value / 2}
        rx={dimensions!.width.value / 2}
        ry={dimensions!.height.value / 2} />
    </svg>
  )
}))

SVGEllipseRender.displayName = 'SVGEllipseRender';
