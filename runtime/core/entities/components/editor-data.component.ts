import type { Nullable } from '../../types';
import type { IComponent, TComponentFactory } from '../component';

export const EDITOR_DATA_COMPONENT = Symbol.for('editorData');

export type TEditorDataComponentProps = {

  name: string;

  isLocked: boolean;

  isVisible: boolean;

  icon?: Nullable<string>;

}

export interface IEditorDataComponent extends IComponent {
  name: string;

  isLocked: boolean;

  isVisible: boolean;

  icon?: Nullable<string>;

  serialize: () => [string, TEditorDataComponentProps];
}

export const editorDataComponent: TComponentFactory<
  IEditorDataComponent,
  TEditorDataComponentProps
> = ({ icon, ...rest }) => [EDITOR_DATA_COMPONENT, {
  ...rest,

  icon: icon || null,

  serialize() {
    return [EDITOR_DATA_COMPONENT.description!, {
      name: this.name,
      isLocked: this.isLocked,
      isVisible: this.isVisible,
      icon: this.icon || null
    }];
  },
}];
