import { type CSSProperties, forwardRef } from 'react';
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

type HTMLInputRenderProps = TRenderableProps & {
  isLocked?: boolean;
}

export const HTMLInputRender = observer(forwardRef<HTMLInputElement, HTMLInputRenderProps>(({
  entity,
  isLocked
}, ref) => {
  const transform = getComponentFrom<ITransformComponent>(entity, TRANSFORM_COMPONENT);
  const dimensions = getComponentFrom<IDimensionsComponent>(entity, DIMENSIONS_COMPONENT);
  const text = getComponentFrom<ITextComponent>(entity, TEXT_COMPONENT);
  const fill = getComponentFrom<IFillComponent>(entity, FILL_COMPONENT);
  const stroke = getComponentFrom<IStrokeComponent>(entity, STROKE_COMPONENT);
  const cornerRadius = getComponentFrom<ICornerRadiusComponent>(entity, CORNER_RADIUS_COMPONENT);

  const style = {
    ...transformStyles(transform),
    ...dimensionsStyles(dimensions),
    ...fillStyles(fill),
    ...cornerRadiusStyles(cornerRadius),
    '--text-color': text!.color.hex,
    '--text-size': `${text!.size.value}px`,
    '--text-line-height': `${text!.lineHeight.value}px`,
    '--stroke-width': `${stroke?.width.value}px`,
    '--stroke-style': stroke?.style,
    '--stroke-color': stroke?.color.hex,
  } as unknown as CSSProperties;

  return (
    <input
      ref={ref}
      className={styles.html_input_renderable}
      style={style}
      placeholder="Поле ввода"
      data-selectable={!isLocked}
      data-id={entity[0].description} />
  )
}))

HTMLInputRender.displayName = 'HTMLInputRender';
