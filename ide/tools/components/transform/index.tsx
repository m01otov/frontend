import { type CSSProperties, forwardRef, useCallback, useState, type MouseEvent as ReactMouseEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';

import { TRectangle, TVector2 } from '@lukoil/scad-runtime-core';

import styles from './styles.module.scss';

type TTransformToolProps = {
  target: React.RefObject<HTMLElement>;
  rect: TRectangle;
  outlineOffset?: number;
  onMove: (delta: TVector2) => void;
}

export const TransformTool = forwardRef<HTMLDivElement, TTransformToolProps>(({
  target,
  rect,
  outlineOffset = 2,
  onMove
}, ref) => {
  const [isMove, setIsMove] = useState(false);

  const handleMouseDown = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsMove(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsMove(false)
  }, [])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isMove) return;

    onMove([
      event.movementX,
      event.movementY
    ])
  }, [isMove, onMove])

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseUp, handleMouseMove])

  return createPortal(
    <div
      ref={ref}
      className={styles.transform_tool}
      style={{
        '--x': `${rect.x}px`,
        '--y': `${rect.y}px`,
        '--width': `${rect.width}px`,
        '--height': `${rect.height}px`,
        '--outline-offset': `${outlineOffset}px`
      } as CSSProperties}
      onMouseDown={handleMouseDown}>
        <button
          className={cn(
            styles.transform_tool__control,
            styles['transform_tool__control--tl'])
          } />
        <button
          className={cn(
            styles.transform_tool__control,
            styles['transform_tool__control--tr'])
          } />
        <button
          className={cn(
            styles.transform_tool__control,
            styles['transform_tool__control--br'])
          } />
        <button
          className={cn(
            styles.transform_tool__control,
            styles['transform_tool__control--bl'])
          } />                              
      </div>
    , target.current || document.body
  )
})

TransformTool.displayName = 'TransformTool';
