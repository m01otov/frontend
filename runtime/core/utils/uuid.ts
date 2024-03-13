import { Nullable } from "../index";

export type TUUID = string;

interface IUUID {
  value: Nullable<TUUID>;

  set: (value: Nullable<TUUID>) => IUUID;
}

export const uuid = (value: Nullable<TUUID>): IUUID => ({
  value,

  set(value: Nullable<TUUID>): IUUID {
    this.value = value;

    return this;
  },

})
