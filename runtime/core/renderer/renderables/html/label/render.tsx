import { type CSSProperties, forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import { TRenderableProps } from '../../common.types';
import { getComponentFrom } from '../../../../entities/component';

import {
  TRANSFORM_COMPONENT,
  DIMENSIONS_COMPONENT,
  TEXT_COMPONENT,
} from '../../../../entities/components';

import type {
  ITransformComponent,
  IDimensionsComponent,
  ITextComponent,
} from '../../../../entities/components';

import {
  dimensionsStyles,
  transformStyles
} from '../../styles.builders';

import styles from './styles.module.scss';

type HTMLLableRenderProps = TRenderableProps & {
  isLocked?: boolean;
}

export const HTMLLableRender = observer(forwardRef<HTMLLabelElement, HTMLLableRenderProps>(({
  entity,
  isLocked
}, ref) => {
  const transform = getComponentFrom<ITransformComponent>(entity, TRANSFORM_COMPONENT);
  const dimensions = getComponentFrom<IDimensionsComponent>(entity, DIMENSIONS_COMPONENT);
  const text = getComponentFrom<ITextComponent>(entity, TEXT_COMPONENT);

  const style = {
    ...transformStyles(transform),
    ...dimensionsStyles(dimensions),
    '--text-color': text!.color.hex,
    '--text-size': `${text!.size.value}px`,
    '--text-line-height': `${text!.lineHeight.value}px`
  } as unknown as CSSProperties;

  return (
    <label
      ref={ref}
      className={styles.html_label_renderable}
      style={style}
      data-selectable={!isLocked}
      data-id={entity[0].description}>
      {text!.text.value}
    </label>
  )
}))

HTMLLableRender.displayName = 'HTMLLableRender';
