export type TVector4 = [number, number, number, number];

interface IVector4 {
  value: TVector4;

  set: (value: TVector4) => IVector4;
 
  readonly a: number;

  readonly b: number;

  readonly c: number;

  readonly d: number;
}

export const vector4 = (value: TVector4): IVector4 => ({
  value,

  set(value: TVector4) {
    this.value = value;

    return this;
  },

  get a(): number {
    return this.value[0];
  },

  get b(): number {
    return this.value[1];
  },

  get c(): number {
    return this.value[2];
  },

  get d(): number {
    return this.value[3];
  }
})
