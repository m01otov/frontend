import { type HTMLAttributes, forwardRef, useMemo, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useUpdateEffect } from 'react-use';
import cn from 'classnames';

import { useForwardedRef, useWatchElementSize } from '@lukoil/scad-ide-ui-core';
import { useCanvasRenderingContext2D } from '../../hooks/canvas-rendering-context-2d.hook';
import { useCanvasContext } from '../../provider';
import { ERulerDirection } from '../../enums';

import styles from './styles.module.scss';

type TRulerProps = {
  direction?: `${ERulerDirection}`;
} & Pick<HTMLAttributes<HTMLDivElement>, 'className'>;

export const Ruler = observer(forwardRef<HTMLCanvasElement, TRulerProps>(({
  direction,
  className
}, ref) => {
  const context = useCanvasContext();
  const forwardedRef = useForwardedRef(ref);
  const canvasRenderingContext2D = useCanvasRenderingContext2D(forwardedRef);
  const isHorizontal = useMemo(() => direction === ERulerDirection.HORIZONTAL, []);
  const [width, height] = useWatchElementSize(forwardedRef);

  const _getRulerScale = useCallback(() => {
    const defaultPixelScale = 2;

    let isHighDensity = window.devicePixelRatio > 1;

    if (!isHighDensity && window.matchMedia) {
      const mq = window.matchMedia(`
        only screen and (min--moz-device-pixel-ratio: 1.3),
        only screen and (-o-min-device-pixel-ratio: 2.6/2),
        only screen and (-webkit-min-device-pixel-ratio: 1.3),
        only screen  and (min-device-pixel-ratio: 1.3),
        only screen and (min-resolution: 1.3dppx)
      `);
      isHighDensity = mq && mq.matches;
    }
    
    return isHighDensity ? 3 : defaultPixelScale;
  }, [])

  // TODO: make canvas render in one loop
  useUpdateEffect(() => {
    const { zoom, offset, viewportCenter } = context;
    const { segmentSize, segmentDivideEach, labelColor, labelFont } = context.options.ruler!;

    if (!canvasRenderingContext2D) return;

    // Prepare
    const scrollPos = -(isHorizontal ? offset.x + viewportCenter[0] : offset.y + viewportCenter[1]);
    const rulerSize = isHorizontal ? width : height;
    const barSize = isHorizontal ? height : width;
    const rulerScale = _getRulerScale();
    const zoomedSegmentSize = zoom * segmentSize;
    const minRange = Math.floor(scrollPos * zoom / zoomedSegmentSize);
    const maxRange = Math.ceil((scrollPos * zoom + rulerSize) / zoomedSegmentSize);
    const length = maxRange - minRange;
    const range = [-Infinity, Infinity];
    const segmentLineSize = 16;
    const divideLineSize = 8;
    const labelOffsetX = 4;
    const labelOffsetY = -2;
    const labelOrigin = 16;

    // Clear
    canvasRenderingContext2D.clearRect(0, 0, width * rulerScale, height * rulerScale);
    canvasRenderingContext2D.save();
    canvasRenderingContext2D.scale(rulerScale, rulerScale);

    canvasRenderingContext2D.strokeStyle = '#262C35';
    canvasRenderingContext2D.lineWidth = 1;
    canvasRenderingContext2D.beginPath();


    for (let i = 0; i <= length; ++i) {
      const n = i + minRange;
      const value = n * segmentSize;
      const startPosition = (value - scrollPos) * zoom;
  
      // Render bars
      for (let j = 0; j < segmentDivideEach; ++j) {
        const position = startPosition + j / segmentDivideEach * zoomedSegmentSize;
        const barValue = value + j / segmentDivideEach * segmentSize;

        if (position < 0 
          || position >= rulerSize
          || barValue < range[0]
          || barValue > range[1]
        ) continue;

        const lineSize = j === 0 ? segmentLineSize : divideLineSize;
        const origin = barSize - lineSize;

        const [x1, y1] = isHorizontal ? [position, origin] : [origin, position];
        const [x2, y2] = isHorizontal ? [x1, y1 + lineSize] : [x1 + lineSize, y1];

        canvasRenderingContext2D.moveTo(x1, y1);
        canvasRenderingContext2D.lineTo(x2, y2);
      }

      // Render labels
      if (startPosition < -zoomedSegmentSize 
        || startPosition >= rulerSize + segmentSize * zoom 
        || value < range[0] 
        || value > range[1]
      ) return;

      const [startX, startY] = isHorizontal
        ? [startPosition - 1 * -3, labelOrigin]
        : [labelOrigin, startPosition - 1 * 3];

      canvasRenderingContext2D.save();

      canvasRenderingContext2D.fillStyle = labelColor;
      canvasRenderingContext2D.font = labelFont;
      // @ts-ignore
      // NOTE: typescript wrong typings for `CanvasRenderingContext2D` class
      canvasRenderingContext2D.letterSpacing  = '1px';
      canvasRenderingContext2D.textAlign = 'left';
      canvasRenderingContext2D.textBaseline = 'bottom';

      if (isHorizontal) {
        canvasRenderingContext2D.fillText(value.toString(), startX + labelOffsetX, startY + labelOffsetY);
      } else {
        canvasRenderingContext2D.translate(startX, startY);
        canvasRenderingContext2D.rotate(-90 * Math.PI / 180)
        canvasRenderingContext2D.fillText(value.toString(), labelOffsetX, labelOffsetY);
      }

      canvasRenderingContext2D.restore();
    }
    
    canvasRenderingContext2D.stroke();
    canvasRenderingContext2D.restore();
  }, [
    context.zoom,
    context.offset.x,
    context.offset.y,
    context.viewportCenter,
    width,
    height,
    _getRulerScale
  ])

  return (
    <canvas
      ref={forwardedRef}
      width={width * _getRulerScale()}
      height={height * _getRulerScale()}
      className={cn(styles.ruler, className)} />
  )
}))

Ruler.displayName = 'Ruler';
