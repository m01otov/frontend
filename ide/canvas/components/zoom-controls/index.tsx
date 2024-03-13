import { type CSSProperties, forwardRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import type { TVector2 } from '@lukoil/scad-runtime-core';
import { Icon, Slider } from '@lukoil/scad-ide-ui-core';
import { useCanvasContext } from '../../provider';

import styles from './styles.module.scss';

export type TZoomControlsProps = {
  placementX: 'left' | 'right';
  placementY: 'top' | 'bottom';
  placementOffset: TVector2;
};

export const ZoomControls = observer(forwardRef<HTMLDivElement, TZoomControlsProps>(({
  placementX,
  placementY,
  placementOffset
}, ref) => {
  const context = useCanvasContext();

  const _limitZoom = useCallback((value: number) => {
    const [min, max] = context.options.zoom!.range;
    
    return Math.min(Math.max(value, min), max)
  }, [])

  const handleDecrementZoom = useCallback(() => {
    const step = context.options.zoom!.step;

    context.updateZoom(_limitZoom(context.zoom - step));
  }, [context.zoom]);

  const handleSliderChange = useCallback((value: number) => {
    context.updateZoom(value);
  }, [context.updateZoom])

  const handleIncrementZoom = useCallback(() => {
    const step = context.options.zoom!.step;

    context.updateZoom(_limitZoom(context.zoom + step));
  }, [context.zoom]);

  const handleReset = useCallback(() => {
    context.updateZoom(1);
  }, [context.updateZoom])

  return (
    <div
      ref={ref}
      className={cn(
        styles.zoom_controls,
        styles[`zoom_controls--placement-x-${placementX}`],
        styles[`zoom_controls--placement-y-${placementY}`],
      )}
      style={{
        '--placement-offset-x': `${placementOffset[0]}px`,
        '--placement-offset-y': `${placementOffset[1]}px`
      } as CSSProperties}>
      <button
        className={styles.zoom_controls__button}
        onClick={handleDecrementZoom}>
        <Icon.ZoomOut size={16} />
      </button>

      <Slider
        value={context.zoom}
        step={context.options.zoom!.step}
        range={context.options.zoom!.range}
        onChange={handleSliderChange}/>
      <button
        className={styles.zoom_controls__button}
        onClick={handleIncrementZoom}>
        <Icon.ZoomIn size={16} />
      </button>

      <button
        className={styles.zoom_controls__reset}
        disabled={context.zoom === 1}
        onClick={handleReset}>
        {context.zoomPercentage}%
      </button>
    </div>
  )
}))

ZoomControls.displayName = 'ZoomControls';
