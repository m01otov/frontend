import { CSSProperties, forwardRef, useEffect, useState } from 'react';
import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react-lite';
import { useAsync } from 'react-use';

import { HTTP_SERVICE_TOKEN, IHttpService } from '@lukoil/scad-runtime-request';
import { createEntitiesCollection, IEntitiesCollection, type TEntity } from '../../../../entities/entity';
import { getComponentFrom } from '../../../../entities/component';

import {
  TRANSFORM_COMPONENT,
  DIMENSIONS_COMPONENT,
  EDITOR_DATA_COMPONENT,
  SOURCE_WIDGET_COMPONENT,
} from '../../../../entities/components';
import type {
  ITransformComponent,
  IDimensionsComponent,
  IEditorDataComponent,
  ISourceWidgetComponent,
} from '../../../../entities/components';

import styles from './styles.module.scss';
import { RenderSystem } from '../../..';

type TInstanceWidgetRendarableProps = {
  entity: TEntity;
};

export const InstanceWidgetRendarable = observer(forwardRef<HTMLDivElement, TInstanceWidgetRendarableProps>(({
  entity,
}, ref) => {
  const httpService = useInjection<IHttpService>(HTTP_SERVICE_TOKEN);
  const [entities, setEntities] = useState<IEntitiesCollection | null>(null);

  const transform = getComponentFrom<ITransformComponent>(entity, TRANSFORM_COMPONENT);
  const dimensions = getComponentFrom<IDimensionsComponent>(entity, DIMENSIONS_COMPONENT);
  const editorData = getComponentFrom<IEditorDataComponent>(entity, EDITOR_DATA_COMPONENT);
  const sourceWidget = getComponentFrom<ISourceWidgetComponent>(entity, SOURCE_WIDGET_COMPONENT);

  useEffect(() => {
    async function load(id: string) {
      const response = await httpService.get(`/file-explorer/${id}/content`);
      const entities = createEntitiesCollection();

      entities.import((response as any).data.entities);

      // Hack to fix dimensions if dimensions changed in source file
      dimensions?.width.set((response as any).data.boundingBox.width);
      dimensions?.height.set((response as any).data.boundingBox.height);

      setEntities(entities);
    }

    if (!sourceWidget) return;

    load(sourceWidget.id.value!);
  }, [sourceWidget])

  return (editorData?.isVisible &&
    <div
      ref={ref}
      className={styles.instance_widget_renderable}
      style={{
        '--position-x': `${transform!.position.x}px`,
        '--position-y': `${transform!.position.y}px`,
        '--width': `${dimensions!.width.value}px`,
        '--height': `${dimensions!.height.value}px`,
      } as CSSProperties}
      data-selectable={!editorData?.isLocked}
      data-id={entity[0].description}>
      {entities &&
        <RenderSystem entities={entities} />
      }
    </div>
  )  
}))

InstanceWidgetRendarable.displayName = 'InstanceWidgetRendarable';