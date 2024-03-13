import { action, computed, makeObservable, observable } from 'mobx';
import { Signal } from 'typed-signals';

import { type TVector2, vector2 } from '@lukoil/scad-runtime-core';
import type { ICanvasContext } from './interfaces';

export const createCanvasContext = (
  options: ICanvasContext['options']
) => makeObservable<ICanvasContext>({

  viewportDimensions: vector2([0, 0]),

  mousePosition: vector2([0, 0]),

  offset: vector2([0, 0]),

  zoom: 1,

  onMousePositionChange: new Signal(),

  onOffsetChange: new Signal(),

  onZoomChange: new Signal(),

  updateViewportDimensions(value: TVector2) {
    this.viewportDimensions.value = value;
  },

  updateMousePosition(value: TVector2) {
    this.mousePosition.value = value;
    this.onMousePositionChange.emit(value);
  },

  updateOffset(value: TVector2) {
    this.offset.value = value;
    this.onOffsetChange.emit(value);
  },

  updateZoom(value: number) {
    this.zoom = value;
    this.onZoomChange.emit(value);
  },

  get zoomPercentage(): number {
    return Math.round(this.zoom * 100);
  },

  get options(): ICanvasContext['options'] {
    return options;
  },

  get viewportCenter(): TVector2 {
    return [
      this.viewportDimensions.x / 2,
      this.viewportDimensions.y / 2
    ];
  },

  get workareaDimensions(): TVector2 {
    return [
      this.viewportDimensions.x + Math.abs(this.offset.x * 2),
      this.viewportDimensions.y + Math.abs(this.offset.y * 2)
    ]
  },

  get workareaTranslate(): TVector2 {
    const [viewportCenterX, viewportCenterY] = this.viewportCenter;
    
    return [
      (this.offset.x + viewportCenterX) * this.zoom,
      (this.offset.y + viewportCenterY) * this.zoom
    ]
  }
}, {
  viewportDimensions: observable,
  mousePosition: observable,
  offset: observable,
  zoom: observable,
  updateViewportDimensions: action.bound,
  updateMousePosition: action.bound,
  updateOffset: action.bound,
  updateZoom: action.bound,
  zoomPercentage: computed,
  viewportCenter: computed,
  workareaDimensions: computed,
  workareaTranslate: computed
})
