import { computed, makeObservable } from 'mobx';

import { IWidgetModel } from '../interfaces';
import { DIMENSIONS_COMPONENT, TRANSFORM_COMPONENT, createEntitiesCollection, getComponentFrom } from '@lukoil/scad-runtime-core';
import type { IDimensionsComponent, ITransformComponent } from '@lukoil/scad-runtime-core';

export const createWidget = () => makeObservable<IWidgetModel>({
  entities: createEntitiesCollection(),
 
  get boundingBox() {
    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;

    const entitiesArray = this.entities.asArray;

    for(let i = 0; i < entitiesArray.length; i++) {
      const entity = entitiesArray[i];
      const transform = getComponentFrom<ITransformComponent>(entity, TRANSFORM_COMPONENT);
      const dimensions = getComponentFrom<IDimensionsComponent>(entity, DIMENSIONS_COMPONENT);

      if (!transform || !dimensions) continue;

      if (i === 0) {
        minX = transform.position.x;
        maxX = transform.position.x + dimensions.width.value;
        minY = transform.position.y;
        maxY = transform.position.y + dimensions.height.value;
      }

      minX = Math.min(minX, transform.position.x);
      maxX = Math.max(maxX, transform.position.x + dimensions.width.value);
      minY = Math.min(minY, transform.position.y);
      maxY = Math.max(maxY, transform.position.y + dimensions.height.value);
    }

    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
  }

}, {
  boundingBox: computed,
})
