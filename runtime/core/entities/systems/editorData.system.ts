import { runInAction } from 'mobx';
import type { IEntitiesCollection, TEntityId } from '../entity';
import type { ISystem } from '../system';
import { EDITOR_DATA_COMPONENT, IEditorDataComponent } from '../components';

interface IEditorDataSystem extends ISystem {
  rename: (id: TEntityId, value: string) => void;

  toggleLock: (id: TEntityId) => void;

  toggleVisibility: (id: TEntityId) => void;
}

export const editorDataSystem = (
  entities: IEntitiesCollection
): IEditorDataSystem => ({
  rename(id: TEntityId, value: string) {
    runInAction(() => {
      const component = entities.getComponentOf<IEditorDataComponent>(id, EDITOR_DATA_COMPONENT);

      if (!component) return;

      component.name = value;
    })
  },

  toggleLock(id: TEntityId) {
    runInAction(() => {
      const component = entities.getComponentOf<IEditorDataComponent>(id, EDITOR_DATA_COMPONENT);

      if (!component) return;

      component.isLocked = !component.isLocked;
    })
  },

  toggleVisibility(id: TEntityId) {
    runInAction(() => {
      const component = entities.getComponentOf<IEditorDataComponent>(id, EDITOR_DATA_COMPONENT);

      if (!component) return;

      component.isVisible = !component.isVisible;
    })
  },
})
