interface IText {
  value: string;

  set: (value: string) => IText;

}

export const text = (value: string): IText => ({
  value,

  set(value: string): IText {
    this.value = value;

    return this;
  },

})
