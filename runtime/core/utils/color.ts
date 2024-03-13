import chroma from 'chroma-js';

export type THexColor = string;

export type TRGBColor = [number, number, number];
export type TRGBAColor = [number, number, number, number];

interface IColor {
  
  value: chroma.Color;

  set: (value: THexColor, opacity?: number) => IColor;

  readonly hex: THexColor;

  readonly rgb: TRGBColor;

  readonly rgba: TRGBAColor;

  readonly opacity: number;

  readonly opacityPercentage: number;

}

export const color = (value: THexColor, opacity: number = 1): IColor => ({
  value: chroma(value).alpha(opacity),

  set(value: THexColor, opacity: number = 1): IColor {
    console.log(1)
    this.value = chroma(value).alpha(opacity);

    return this;
  },

  get hex() {
    return this.value.hex();
  },

  get rgb() {
    return this.value.rgb();
  },

  get rgba() {
    return this.value.rgba();
  },

  get opacity() {
    return this.value.alpha();
  },

  get opacityPercentage() {
    return this.value.alpha() * 100;
  }
  
})
