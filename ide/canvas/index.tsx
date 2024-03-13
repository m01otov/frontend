import { forwardRef } from 'react';

import { CanvasContextProvider, type TCanvasContextProviderProps } from './provider';
import { ERulerDirection } from './enums';
import { Ruler } from './components/ruler';
import { Viewport } from './components/viewport';
import { type TZoomControlsProps, ZoomControls } from './components/zoom-controls';
import { type TMousePositionDisplayProps, MousePositionDisplay } from './components/mouse-position-display';

import styles from './styles.module.scss';

type TCanvasProps = {
  contentRef: any;
  zoomControls?: TZoomControlsProps;
  mousePositionDisplay?: TMousePositionDisplayProps;
  showDebugDraw?: boolean;
  showContentBounds?: boolean;
} & TCanvasContextProviderProps;

const ZOOM_CONTROLS_DEFAULT_PROPS: TZoomControlsProps = {
  placementX: 'right',
  placementY: 'top',
  placementOffset: [16, 40]
}

const MOUSE_POSITION_DISPLAY_DEFAULT_PROPS: TZoomControlsProps = {
  placementX: 'left',
  placementY: 'top',
  placementOffset: [40, 46]
}

export const Canvas = forwardRef<HTMLDivElement, TCanvasProps>(({
  contentRef,
  children,
  zoomControls = ZOOM_CONTROLS_DEFAULT_PROPS,
  mousePositionDisplay = MOUSE_POSITION_DISPLAY_DEFAULT_PROPS,
  showDebugDraw = false,
  showContentBounds = false,
  ...rest
}, ref) => (
  <CanvasContextProvider {...rest}>
    <div className={styles.canvas}>

      <div className={styles['canvas_area--zero']} />   

      <Ruler
        className={styles['canvas_area--rulerh']}
        direction={ERulerDirection.HORIZONTAL} />

      <Ruler
        className={styles['canvas_area--rulerv']}
        direction={ERulerDirection.VERTICAL} />
        
      <Viewport
        ref={ref}
        contentRef={contentRef}
        className={styles['canvas_area--viewport']}
        showDebugDraw={showDebugDraw}
        showContentBounds={showContentBounds}>
        {children}
      </Viewport>

      <MousePositionDisplay {...mousePositionDisplay} />

      <ZoomControls {...zoomControls} />
    </div>
  </CanvasContextProvider>
))

Canvas.displayName = 'Canvas';
