import { type CSSProperties, forwardRef, PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';
import { TRenderableProps } from '../../common.types';
import { getComponentFrom } from '../../../../entities/component';

import {
  TRANSFORM_COMPONENT,
  DIMENSIONS_COMPONENT,
  TEXT_COMPONENT,
  FILL_COMPONENT,
  STROKE_COMPONENT,
  CORNER_RADIUS_COMPONENT,
} from '../../../../entities/components';

import type {
  ITransformComponent,
  IDimensionsComponent,
  ITextComponent,
  IFillComponent,
  IStrokeComponent,
  ICornerRadiusComponent,
} from '../../../../entities/components';

import {
  cornerRadiusStyles,
  dimensionsStyles,
  fillStyles,
  transformStyles
} from '../../styles.builders';

import styles from './styles.module.scss';

type THTMLContainerRenderProps = TRenderableProps & PropsWithChildren<{
  isLocked?: boolean;
}>

export const HTMLContainerRender = observer(forwardRef<HTMLDivElement, THTMLContainerRenderProps>(({
  entity,
  isLocked,
  children
}, ref) => {
  const transform = getComponentFrom<ITransformComponent>(entity, TRANSFORM_COMPONENT);
  const dimensions = getComponentFrom<IDimensionsComponent>(entity, DIMENSIONS_COMPONENT);
  const fill = getComponentFrom<IFillComponent>(entity, FILL_COMPONENT);
  const cornerRadius = getComponentFrom<ICornerRadiusComponent>(entity, CORNER_RADIUS_COMPONENT);

  const style = {
    ...transformStyles(transform),
    ...dimensionsStyles(dimensions),
    ...fillStyles(fill),
    ...cornerRadiusStyles(cornerRadius),
  } as unknown as CSSProperties;

  return (
    <div
      ref={ref}
      className={styles.html_container_renderable}
      style={style}
      data-selectable={!isLocked}
      data-id={entity[0].description}>
      {children}
    </div>      
  )
}))

HTMLContainerRender.displayName = 'HTMLContainerRender';
