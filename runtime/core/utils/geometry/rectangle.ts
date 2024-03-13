export type TRectangle = {
  x: number;

  y: number;

  width: number;
  
  height: number;
}

export interface IRectangle extends TRectangle {
  set: (rect: TRectangle) => IRectangle;

  empty: () => IRectangle;

  overlaps: (rect: TRectangle) => boolean;

  x: number;

  y: number;

  width: number;
  
  height: number;

  readonly isEmpty: boolean;
}

const EMPTY = { x: 0, y: 0, width: 0, height: 0 };

export const rectangle = (value: TRectangle = EMPTY): IRectangle => ({
  ...value,

  set(rect: TRectangle) {
    this.x = rect.x;
    this.y = rect.y;
    this.width = rect.width;
    this.height = rect.height;
    
    return this;
  },

  empty() {
    return rectangle(EMPTY);
  },

  overlaps(rect: TRectangle) {
    if (this.x >= rect.x + rect.width || rect.x >= this.x + this.width) return false;

    if (this.y >= rect.y + rect.height || rect.y > this.y + this.height) return false;

    return true;
  },

  get isEmpty(): boolean {
    return this.x === 0 && this.y === 0 && this.width === 0 && this.height === 0;
  }

})
