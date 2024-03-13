import { forwardRef, useCallback, useRef } from 'react'
import { observer } from 'mobx-react-lite';

import { Canvas } from '@lukoil/scad-ide-canvas';
import { useForwardedRef } from '@lukoil/scad-ide-ui-core';
import { RenderSystem, TVector2, moveSystem } from '@lukoil/scad-runtime-core';
import { useWidgetEditorContext } from '../provider';
import { EEditorTool, TransformTool } from '@lukoil/scad-ide-tools';

export const WidgetEditorCanvas = observer(forwardRef<HTMLDivElement, unknown>((_, ref) => {

  const {
    activeToolComponent: ActiveToolComponent,
    widget,
    activeToolId,
    makeSelection,
    selection,
    selectionBoundingBox,
    resetTool
  } = useWidgetEditorContext();
  
  const forwardedRef = useForwardedRef(ref);
  const contentRef = useRef(ref);

  const system = moveSystem(widget.entities);

  const handleCreate = useCallback((data: any) => {
    widget.entities.create(data);
    resetTool();
  }, [])

  const handleSelect = useCallback((data: string[]) => {
    makeSelection(data);
  }, [])

  const handleMove = useCallback((delta: TVector2) => {
    system.update(selection, delta)
  }, [system, selection])

  return (widget &&
    <>
      <Canvas
        ref={forwardedRef}
        contentRef={contentRef}>
        <RenderSystem
          entities={widget.entities}
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

WidgetEditorCanvas.displayName = 'WidgetEditorCanvas';
