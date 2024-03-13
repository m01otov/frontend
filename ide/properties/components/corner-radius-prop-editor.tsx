import { ChangeEvent, forwardRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { Icon, Input } from '@lukoil/scad-ide-ui-core';
import { PropInputPrefix } from './prop-input-prefix';
import { PropEditorContainer, PropEditorRow } from './prop-editor-container';
import { ICornerRadiusComponent } from '@lukoil/scad-runtime-core';

export const CornerRadiusPropEditor = observer(forwardRef<HTMLDivElement, ICornerRadiusComponent>(({
  values
}, ref) => {

  const handleTopLeftChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    values.set([ Number(event.target.value), values.b, values.c, values.d ])
  }, []);

  const handleTopRightChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    values.set([ values.a, Number(event.target.value), values.c, values.d ])
  }, []);

  const handleBottomRightChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    values.set([ values.a, values.b, Number(event.target.value), values.d ])
  }, []);

  const handleBottomLeftChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    values.set([ values.a, values.b, values.c, Number(event.target.value) ])
  }, []);

  return (
    <PropEditorContainer
      ref={ref}
      title="Скругление углов">
      <PropEditorRow>
        <Input
          prefix={
            <PropInputPrefix>
              <Icon.TlCorner size={10} />
            </PropInputPrefix>
          }
          value={values.a}
          onChange={handleTopLeftChange} />
        <Input
          prefix={
            <PropInputPrefix>
              <Icon.TrCorner size={10} />
            </PropInputPrefix>
          }
          value={values.b}
          onChange={handleTopRightChange} />
        <Input
          prefix={
            <PropInputPrefix>
              <Icon.BrCorner size={10} />
            </PropInputPrefix>
          }
          value={values.c}
          onChange={handleBottomRightChange} />
        <Input
          prefix={
            <PropInputPrefix>
              <Icon.BlCorner size={10} />
            </PropInputPrefix>
          }
          value={values.d}
          onChange={handleBottomLeftChange} />                           
      </PropEditorRow>
    </PropEditorContainer>
  )
}))

CornerRadiusPropEditor.displayName = 'CornerRadiusPropEditor';
