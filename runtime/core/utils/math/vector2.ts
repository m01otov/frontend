export type TVector2 = [number, number];

interface IVector2 {
  value: TVector2;

  add: (vector: TVector2) => IVector2;

  sub: (vector: TVector2) => IVector2;

  readonly x: number;

  readonly y: number;
}

export const vector2 = (value: TVector2): IVector2 => ({
  value,

  add(vector: TVector2): IVector2 {
    this.value[0] += vector[0];
    this.value[1] += vector[1];

    return this;
  },

  sub(vector: TVector2): IVector2 {
    this.value[0] -= vector[0];
    this.value[1] -= vector[1];

    return this;
  },

  get x(): number {
    return this.value[0];
  },

  get y(): number {
    return this.value[1];
  }
})
