import { type HTMLAttributes, type PropsWithChildren, forwardRef, type CSSProperties, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { useForwardedRef, useWatchElementSize } from '@lukoil/scad-ide-ui-core';
import { useCanvasContext } from '../../provider';
import { useMouseWheelZoom } from '../../hooks/mouse-wheel-zoom.hook';
import { useMiddleMouseButtonDrag } from '../../hooks/middle-mouse-button-drag.hook';
import { useCanvasMousePosition } from '../../hooks/canvas-mouse-position.hook';

import styles from './styles.module.scss';

export type TViewportProps = PropsWithChildren<{
  contentRef: any
  showDebugDraw?: boolean;
  showContentBounds?: boolean;
}> & Pick<HTMLAttributes<HTMLDivElement>, 'className'>;

export const Viewport = observer(forwardRef<HTMLDivElement, TViewportProps>(({
  contentRef,
  showDebugDraw = false,
  showContentBounds = false,
  children,
  className
}, ref) => {
  const { zoom, workareaDimensions, workareaTranslate, updateViewportDimensions } = useCanvasContext();
  const [workareaW, workareaH] = workareaDimensions;
  const [workareaTranslateX, workareaTranslateY] = workareaTranslate;
  const forwardedRef = useForwardedRef(ref);
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportW, viewportH] = useWatchElementSize(containerRef);

  useMouseWheelZoom(forwardedRef);

  useMiddleMouseButtonDrag(forwardedRef);

  useCanvasMousePosition(forwardedRef);

  useEffect(() => {
    updateViewportDimensions([viewportW, viewportH]);
  }, [viewportW, viewportH, updateViewportDimensions]);

  return(
    <div
      ref={containerRef}
      className={cn(styles.viewport, className)}
      style={{
        '--workareaW': `${workareaW}px`,
        '--workareaH': `${workareaH}px`,
        '--translateX': `${workareaTranslateX}px`,
        '--translateY': `${workareaTranslateY}px`,
        '--scale': zoom
      } as CSSProperties}>
        
      <div className={styles.viewport_grid} />

      <div 
        ref={forwardedRef}
        className={cn(
          styles.viewport_workarea,
          {
            [styles['viewport_workarea--debug-outline']]: showDebugDraw,
            [styles['viewport_workarea--content-bounds']]: showContentBounds
          }
        )}>
        <div 
          ref={contentRef}
          className={styles.viewport_workarea__content}>
          {children}
        </div>
      </div>

    </div>
  );

}))

Viewport.displayName = 'Viewport';
