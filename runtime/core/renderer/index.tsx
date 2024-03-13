import { type FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import type { IEntitiesCollection, TEntity } from '../entities/entity';
import { IElementComponent, ELEMENT_COMPONENT } from '../entities/components';
import { getComponentFrom } from '../entities/component';
import { HTML_RENDERABLES_MAP, SVG_RENDERABLES_MAP, INSTANCE_RENDERABLES_MAP } from './renderables';

type TRenderSystemProps = {
  entities: IEntitiesCollection;
  isInEditor?: boolean;
}

export const RenderSystem: FC<TRenderSystemProps> = observer(({
  entities,
  isInEditor = false
}) => {
  const renderEntity = useCallback((entity: TEntity) => {
    const [id] = entity;
    // const script = getComponentFrom<IScriptComponent>(entity, SCRIPT_COMPONENT);
    const element = getComponentFrom<IElementComponent<any>>(entity, ELEMENT_COMPONENT);

    let Component = null;

    if (!element) return Component;

    switch (element.type) {
      case 'svg':
        Component = SVG_RENDERABLES_MAP[element.shape];
        break;
      case 'html':
        Component = HTML_RENDERABLES_MAP[element.shape];
        break;
      case 'instance':
        Component = INSTANCE_RENDERABLES_MAP[element.shape];
        break;
    }

    return Component ? <Component key={id.description} entity={entity} isEditor={isInEditor} /> : null;
  }, []);

  return entities.roots.map(entity => renderEntity(entity));

})

RenderSystem.displayName = 'RenderSystem';
