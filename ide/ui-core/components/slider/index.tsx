import { CSSProperties, forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
import cn from 'classnames';

import { type TVector2 } from '@lukoil/scad-runtime-core';
import { useFocusElement, useForwardedRef } from '../..';

import styles from './styles.module.scss';

type TSliderProps = {
  value: number;
  step: number;
  range: TVector2;
  disabled?: boolean;
  onChange: (value: number) => void;
}

export const Slider = forwardRef<HTMLDivElement, TSliderProps>(({
  value,
  range,
  step,
  disabled = false,
  onChange
}, ref) => {
  const forwardedRef = useForwardedRef(ref)
  const handleRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const isFocused = useFocusElement<HTMLDivElement>(forwardedRef);

  const handlePosition = useMemo(() => {
    const { current: barElement } = barRef;

    if (!barElement) return; 

    const barRect = barElement.getBoundingClientRect();
    const [min, max] = range;

    const boundedValue = (value - min) / (max - min);
    
    return barRect.width * boundedValue;
  }, [
    value,
    range,
    barRef.current
  ])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const clientX = event.clientX;
    const { current } = barRef;

    if (!current) return;
    
    const BIG_NUM = 10e10;
    const rect = current.getBoundingClientRect();
    const [min, max] = range;
    const newValue = Math.round((((clientX - rect.left) / rect.width) * (max - min) + min) * BIG_NUM) / BIG_NUM;

    if (!newValue) return;

    if (newValue > max)  {
        onChange(max);
        return;
    }

    if (newValue < min) {
        onChange(min);
        return;
    }

    const remainder = Math.round(newValue * BIG_NUM) % Math.round(step * BIG_NUM);
    const closestBigNum = Math.round(newValue * BIG_NUM - remainder);

    const rounded = remainder === 0 ? newValue : closestBigNum / BIG_NUM;

    const res = Math.abs(remainder / BIG_NUM) < step / 2
        ? rounded
        : rounded + step * Math.sign(newValue);

    const afterDot = step.toString().split('.')[1];

    const normilizedValue =  afterDot ? parseFloat(res.toFixed(afterDot.length)) : res;

    onChange(normilizedValue);
  }, [range])

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove])

  const handleMouseDown = useCallback(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, handleMouseUp])

  const handleMouseWheel = useCallback((event: WheelEvent) => {
    if(!isFocused) return;

    const [min, max] = range;
    const normilizedDelta = Math.sign(event.deltaY);
    const newValue = value - (normilizedDelta * step);
    const limitedValue = Math.min(Math.max(newValue, min), max);

    onChange(Math.round(limitedValue * 100) / 100);
  }, [value, range, step, isFocused]);

  useEffect(() => {
    const { current: containerElement } = forwardedRef;
    const { current: handleElement } = handleRef;

    if (!handleElement || !containerElement) return;

    handleElement.addEventListener('mousedown', handleMouseDown);
    containerElement.addEventListener('wheel', handleMouseWheel);

    return () => {
      handleElement.removeEventListener('mousedown', handleMouseDown);
      containerElement.removeEventListener('wheel', handleMouseWheel);
    };

  }, [handleRef.current, forwardedRef.current, handleMouseDown, handleMouseWheel])

  return (
    <div
      ref={forwardedRef}
      tabIndex={-1}
      className={cn(
        styles.slider,
        {
          [styles['slider--focus']]: isFocused,
          [styles['slider--disabled']]: disabled
        }
      )}>

      <div
        ref={barRef}
        className={styles.slider_bar} />

      <div
        ref={handleRef}
        className={styles.slider_handle}
        style={{
          '--handle-position': `${handlePosition}px`
        } as CSSProperties} />
    </div>
  );

})

Slider.displayName = 'Slider';
