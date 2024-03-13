import { ChangeEvent, forwardRef, useCallback } from 'react';

import { Icon, Input } from '@lukoil/scad-ide-ui-core';
import { ITextComponent } from '@lukoil/scad-runtime-core';
import { PropInputPrefix } from './prop-input-prefix';
import { PropEditorContainer, PropEditorRow } from './prop-editor-container';

export const TextPropEditor = forwardRef<HTMLDivElement, ITextComponent>(({
  color,
  text,
  size,
  lineHeight,
}, ref) => {
  const handleColorChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    color.set(event.target.value, color.opacity);
  }, [color.opacity]);

  const handleOpacityChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    color.set(color.hex, Number(event.target.value) / 100);
  }, [color.hex]);

  const handleSizeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    size.set(Number(event.target.value));
  }, []);

  const handleLineHeightChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    lineHeight.set(Number(event.target.value));
  }, []);

  const handleTextChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    text.set(event.target.value);
  }, []);

  return (
    <PropEditorContainer 
      ref={ref}
      title="Текст">
      <PropEditorRow>
        <Input 
          defaultValue={text.value}
          onBlur={handleTextChange} />  
      </PropEditorRow>

      <PropEditorRow>
        <Input
          prefix={
            <PropInputPrefix>
              <Icon.FontSize size={10} />
            </PropInputPrefix>}
          sufix={<PropInputPrefix>px</PropInputPrefix>}
          defaultValue={size.value}
          onBlur={handleSizeChange} />
        <Input
          prefix={
            <PropInputPrefix>
              <Icon.LineHeight size={10} />
            </PropInputPrefix>}
          sufix={<PropInputPrefix>px</PropInputPrefix>}
          defaultValue={lineHeight.value}
          onBlur={handleLineHeightChange} />        
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

TextPropEditor.displayName = 'TextPropEditor';
