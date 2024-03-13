import { runInAction } from 'mobx';

import type { IEntitiesCollection } from '../entity';
import type { ISystem } from '../system';
import { ITransformComponent, TRANSFORM_COMPONENT } from '../components';
import type { TVector2 } from '../../utils';
import { getComponentFrom } from '../component';

interface IMoveSystem extends ISystem {
  update: (id: string[], delta: TVector2) => void;
}

export const moveSystem = (
  entities: IEntitiesCollection
): IMoveSystem => ({
  update(ids: string[], delta: TVector2) {
    runInAction(() => {
      const entitiesToUpdate = entities.asArray.filter(([id]) => ids.includes(id.description!));

      entitiesToUpdate.forEach(entity => {
        const transform = getComponentFrom<ITransformComponent>(entity, TRANSFORM_COMPONENT);

        if (!transform) return;

        transform.position.add(delta);
      })
    })
  },

})
