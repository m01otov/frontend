interface IRotation {
  radians: number;

  readonly degrees: number;
}

export const rotation = (radians: number): IRotation => ({
  radians,
  
  get degrees(): number {
    return this.radians * 180 / Math.PI;
  }

})
