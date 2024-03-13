import { type CSSProperties, forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import type { TVector2 } from '@lukoil/scad-runtime-core';
import { useCanvasContext } from '../../provider';

import styles from './styles.module.scss';

export type TMousePositionDisplayProps = {
  placementX: 'left' | 'right';
  placementY: 'top' | 'bottom';
  placementOffset: TVector2;
};

export const MousePositionDisplay = observer(forwardRef<HTMLDivElement, TMousePositionDisplayProps>(({
  placementX,
  placementY,
  placementOffset
}, ref) => {
  const { mousePosition } = useCanvasContext();

  return (
    <div
      ref={ref}
      className={cn(
        styles.mouse_position_display,
        styles[`mouse_position_display--placement-x-${placementX}`],
        styles[`mouse_position_display--placement-y-${placementY}`],
      )}
      style={{
        '--placement-offset-x': `${placementOffset[0]}px`,
        '--placement-offset-y': `${placementOffset[1]}px`
      } as CSSProperties}>
      <span>x:&nbsp;{mousePosition.x}</span>
      <span>y:&nbsp;{mousePosition.y}</span>
    </div>
  );
}))

MousePositionDisplay.displayName = 'MousePositionDisplay';
