import { type CSSProperties, type PropsWithChildren, forwardRef } from 'react';
import { createPortal } from 'react-dom';

import type { TRectangle } from '@lukoil/scad-runtime-core';

import styles from './styles.module.scss';

type TToolFrameProps = PropsWithChildren<{
  target: React.RefObject<HTMLElement>;
  rect: TRectangle;
  shouldRender?: boolean;
  outlineOffset?: number;
}>

export const ToolFrame = forwardRef<HTMLDivElement, TToolFrameProps>(({
  target,
  rect,
  shouldRender = false,
  outlineOffset = 2,
  children
}, ref) => {
  return shouldRender && createPortal(
    <div
      ref={ref}
      className={styles.tool_frame}
      style={{
        '--x': `${rect.x}px`,
        '--y': `${rect.y}px`,
        '--width': `${rect.width}px`,
        '--height': `${rect.height}px`,
        '--outline-offset': `${outlineOffset}px`
      } as CSSProperties}>
      {children}
    </div>
    , target.current || document.body
  )
})

ToolFrame.displayName = 'ToolFrame';
