import { action, makeObservable, observable } from 'mobx';
import { Signal } from 'typed-signals';

import { type Nullable } from '@lukoil/scad-runtime-core';

export type TTreeContextProps = {
  withIndentLines?: boolean;
}

export interface ITreeContext {

  foldedIds: string[];

  activeId: Nullable<string>;

  onActiveNodeChange: Signal<(nodeId: Nullable<string>) => void>;

  unfold: (nodeId: string) => void;

  fold: (nodeId: string) => void;

  setActive: (nodeId: Nullable<string>) => void;

  readonly options: TTreeContextProps;

}

export const createTreeContext = (
  props: TTreeContextProps
) => makeObservable<ITreeContext>({
  foldedIds: [],

  activeId: null,

  onActiveNodeChange: new Signal(),

  unfold(nodeId: string) {
    this.foldedIds = this.foldedIds.filter(id => id !== nodeId);
  },

  fold(nodeId: string) {
    this.foldedIds.push(nodeId);
  },

  setActive(nodeId: Nullable<string>) {
    this.activeId = nodeId;
    this.onActiveNodeChange.emit(nodeId);
  },

  get options(): TTreeContextProps {
    return props;
  }
}, {
  foldedIds: observable,
  activeId: observable,
  unfold: action.bound,
  fold: action.bound,
  setActive: action.bound
})
