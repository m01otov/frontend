import { Signal } from 'typed-signals';
import { type TVector2, vector2 } from '@lukoil/scad-runtime-core';

type TCanvasContextOptions = {
  ruler?: {
    segmentSize: number;
    segmentDivideEach: number;
    labelFont: string;
    labelColor: string;
  },
  zoom?: {
    range: TVector2;
    step: number;
  }
}

export interface ICanvasContext {

  viewportDimensions: ReturnType<typeof vector2>;

  mousePosition: ReturnType<typeof vector2>;

  offset: ReturnType<typeof vector2>;

  zoom: number;

  onMousePositionChange: Signal<(value: TVector2) => void>;

  onOffsetChange: Signal<(value: TVector2) => void>;

  onZoomChange: Signal<(value: number) => void>;

  updateViewportDimensions: (value: TVector2) => void;

  updateMousePosition: (value: TVector2) => void;

  updateOffset: (value: TVector2) => void;

  updateZoom: (value: number) => void;

  readonly zoomPercentage: number;

  readonly options: TCanvasContextOptions;

  readonly viewportCenter: TVector2;

  readonly workareaDimensions: TVector2;

  readonly workareaTranslate: TVector2;
  
}
