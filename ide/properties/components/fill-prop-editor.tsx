import { ChangeEvent, forwardRef, useCallback } from 'react';

import { Icon, Input } from '@lukoil/scad-ide-ui-core';
import { PropInputPrefix } from './prop-input-prefix';
import { PropEditorContainer, PropEditorRow } from './prop-editor-container';
import { IFillComponent } from '@lukoil/scad-runtime-core';

export const FillPropEditor = forwardRef<HTMLDivElement, IFillComponent>(({
  color
}, ref) => {
  const handleColorChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    color.set(event.target.value, color.opacity);
  }, [color.opacity]);

  const handleOpacityChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    color.set(color.hex, Number(event.target.value) / 100);
  }, [color.hex]);
  
  return (
    <PropEditorContainer 
      ref={ref}
      title="Заливка">
      <PropEditorRow>
        <Input
          defaultValue={color.hex}
          onBlur={handleColorChange} />
        <Input
          prefix={
            <PropInputPrefix>
              <Icon.Opacity size={10} />
            </PropInputPrefix>
          }
          sufix={<PropInputPrefix>%</PropInputPrefix>}
          defaultValue={color.opacityPercentage}
          onBlur={handleOpacityChange} />
      </PropEditorRow>
    </PropEditorContainer>
  )
})

FillPropEditor.displayName = 'FillPropEditor';
