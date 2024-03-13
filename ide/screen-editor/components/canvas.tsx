import { forwardRef, useCallback, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { observer } from 'mobx-react-lite';
import { useInjection } from 'inversify-react';

import { IFile } from '@lukoil/scad-file-explorer';
import { Canvas } from '@lukoil/scad-ide-canvas';
import { useForwardedRef } from '@lukoil/scad-ide-ui-core';
import { EFileExtension } from '@lukoil/scad-file-explorer/enums';
import { EEditorTool, TransformTool, widgetInstanceFactory } from '@lukoil/scad-ide-tools';
import { RenderSystem, type TVector2, moveSystem } from '@lukoil/scad-runtime-core';
import { useScreenEditorContext } from '../provider';
import { HTTP_SERVICE_TOKEN, IHttpService } from '@lukoil/scad-runtime-request';

export const ScreenEditorCanvas = observer(forwardRef<HTMLDivElement, unknown>((_, ref) => {
  const {
    activeToolComponent: ActiveToolComponent,
    entities,
    activeToolId,
    makeSelection,
    selection,
    selectionBoundingBox,
    resetTool
  } = useScreenEditorContext();
  const httpService = useInjection<IHttpService>(HTTP_SERVICE_TOKEN);
  const forwardedRef = useForwardedRef(ref);
  const contentRef = useRef(ref);
  const system = moveSystem(entities);

  const [collect, drop] = useDrop<IFile, unknown, unknown>(() => ({
    accept: EFileExtension.WGT,
    drop: async (item, monitor) => {
      const { current: element } = forwardedRef;

      if (!element) return;

      const elementRect = element.getBoundingClientRect();
      const didDrop = monitor.didDrop()
      const clientOffset = monitor.getClientOffset();

      if (didDrop || !clientOffset) return;

      const response: any = await httpService.get(`/file-explorer/${item.id}/content`);

      const x = clientOffset.x - elementRect.x;
      const y = clientOffset.y - elementRect.y;
      const width = response.data.boundingBox.width || 0;      
      const height = response.data.boundingBox.height || 0;      

      const entityComponentsData = widgetInstanceFactory({
        parent: {
          id: null
        },
        sourceWidget: {
          id: item.id
        },
        transform: {
          position: [
            Math.floor((x - (elementRect.width / 2)) - (width / 2)),
            Math.floor((y - (elementRect.height / 2)) - (height / 2))
          ],
        },
        dimensions: { width, height }
      })

      handleCreate(entityComponentsData);
    }
  }))

  const handleCreate = useCallback((data: any) => {
    entities.create(data);
    resetTool();
  }, [])

  const handleSelect = useCallback((data: string[]) => {
    makeSelection(data);
  }, [])

  const handleMove = useCallback((delta: TVector2) => {
    system.update(selection, delta)
  }, [system, selection])

  return (
    <>
      <Canvas
        // TODO: Починить типизацию при таком использовании forwardedRef
        // @ts-ignore
        ref={drop(forwardedRef)}
        contentRef={contentRef}
        showContentBounds>
        <RenderSystem
          entities={entities}
          isInEditor />
      </Canvas>

      {ActiveToolComponent &&
        <ActiveToolComponent
          target={forwardedRef}
          onComplete={
            activeToolId === EEditorTool.SELECT 
            ? handleSelect
            : handleCreate
          } />
      }
      {selection.length > 0 &&
        <TransformTool
          target={contentRef as any}
          rect={selectionBoundingBox}
          onMove={handleMove} />
      }
    </>
  )
}))

ScreenEditorCanvas.displayName = 'ScreenEditorCanvas';
