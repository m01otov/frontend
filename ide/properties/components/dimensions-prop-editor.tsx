import { ChangeEvent, forwardRef, useCallback } from 'react';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';

import { Input } from '@lukoil/scad-ide-ui-core';
import { IDimensionsComponent } from '@lukoil/scad-runtime-core';
import { PropInputPrefix } from './prop-input-prefix';
import { PropEditorContainer, PropEditorRow } from './prop-editor-container';

export const DimensionsPropEditor = observer(forwardRef<HTMLDivElement, IDimensionsComponent>(({
  width,
  height
}, ref) => {
  const handleWidthChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    runInAction(() => {
      width.set(Math.abs(Number(event.target.value)));
    })
  }, [width.value])

  const handleHeightChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    runInAction(() => {
      height.set(Math.abs(Number(event.target.value)));
    })
  }, [height.value])

  return (
    <PropEditorContainer
      ref={ref}
      title="Размер">
      <PropEditorRow>
        <Input
          key={`dim-w-${width.value}`}
          prefix={<PropInputPrefix>w:</PropInputPrefix>}
          sufix={<PropInputPrefix>px</PropInputPrefix>}
          defaultValue={width.value}
          onBlur={handleWidthChange} />
        <Input
          key={`dim-h-${width.value}`}
          prefix={<PropInputPrefix>h:</PropInputPrefix>}
          sufix={<PropInputPrefix>px</PropInputPrefix>}
          defaultValue={height.value}
          onBlur={handleHeightChange} />
      </PropEditorRow>
    </PropEditorContainer>
  )
}))

DimensionsPropEditor.displayName = 'DimensionsPropEditor';
