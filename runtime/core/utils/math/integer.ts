interface IInteger {
  value: number;

  set: (value: number) => IInteger;

}

export const integer = (value: number): IInteger => ({
  value,

  set(value: number): IInteger {
    this.value = value;

    return this;
  },

})
