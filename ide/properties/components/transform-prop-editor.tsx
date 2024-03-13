import { ChangeEvent, forwardRef, useCallback } from 'react';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';

import { Input } from '@lukoil/scad-ide-ui-core';
import { ITransformComponent } from '@lukoil/scad-runtime-core';
import { PropInputPrefix } from './prop-input-prefix';
import { PropEditorContainer, PropEditorRow } from './prop-editor-container';

export const TransformPropEditor = observer(forwardRef<HTMLDivElement, ITransformComponent>(({
  position
}, ref) => {

  const handleXPositionChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    runInAction(() => {
      position.value = [Number(event.target.value), position.y]
    })
  }, [position.y])

  const handleYPositionChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    runInAction(() => {
      position.value = [position.x, Number(event.target.value)]
    })
  }, [position.x])

  return (
    <PropEditorContainer 
      ref={ref}
      title="Трансформация">
      <PropEditorRow>
        <Input
          key={`pos-x-${position.x}`}
          prefix={<PropInputPrefix>x:</PropInputPrefix>}
          sufix={<PropInputPrefix>px</PropInputPrefix>}
          defaultValue={position.x}
          onBlur={handleXPositionChange} />
        <Input
          key={`pos-y-${position.y}`}
          prefix={<PropInputPrefix>y:</PropInputPrefix>}
          sufix={<PropInputPrefix>px</PropInputPrefix>}
          defaultValue={position.y}
          onBlur={handleYPositionChange} />
      </PropEditorRow>
    </PropEditorContainer>
  )
}))

TransformPropEditor.displayName = 'TransformPropEditor';
