import { ChangeEvent, forwardRef, useCallback } from 'react';

import { Icon, Input, Select, Option } from '@lukoil/scad-ide-ui-core';
import { IStrokeComponent } from '@lukoil/scad-runtime-core';
import { PropInputPrefix } from './prop-input-prefix';
import { PropEditorContainer, PropEditorRow } from './prop-editor-container';

export const StrokePropEditor = forwardRef<HTMLDivElement, IStrokeComponent>(({
  width,
  style,
  color,
}, ref) => {
  const handleColorChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    color.set(event.target.value, color.opacity);
  }, [color.opacity]);

  const handleOpacityChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    color.set(color.hex, Number(event.target.value) / 100);
  }, [color.hex]);

  const handleStrokeWidthChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    width.set(Number(event.target.value));
  }, []);
  
  return (
    <PropEditorContainer 
      ref={ref}
      title="Обводка">
      <PropEditorRow>
        <Input
          sufix={<PropInputPrefix>px</PropInputPrefix>}
          defaultValue={width.value}
          onBlur={handleStrokeWidthChange} />

        <Select value={style}>
          <Option value="solid">solid</Option>
          <Option value="dashed">dashed</Option>
          <Option value="dotted">dotted</Option>
        </Select>
      </PropEditorRow>

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

StrokePropEditor.displayName = 'StrokePropEditor';
