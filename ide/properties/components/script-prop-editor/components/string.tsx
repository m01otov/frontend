import { FC } from 'react';

import { Textarea } from '@lukoil/scad-ide-ui-core';

type TStringEditorProps = {
  defaultValue: string
}

export const StringEditor: FC<TStringEditorProps> = ({ defaultValue }) => {

  return (
    <Textarea defaultValue={defaultValue} />
  )
}

StringEditor.displayName = '';
StringEditor.defaultProps = {
  defaultValue: '',
}
