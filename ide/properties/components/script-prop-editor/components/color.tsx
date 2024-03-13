import { FC } from 'react';

import { Input } from '@lukoil/scad-ide-ui-core';

import { PropInputPrefix } from '../../prop-input-prefix';

import styles from '../styles.module.scss';

type TColorEditorProps = {
  defaultValue: string
}

export const ColorEditor: FC<TColorEditorProps> = ({ defaultValue }) => {

  return (
    <Input
      className={styles.control_input}
      prefix={(
        <PropInputPrefix>
          <div style={{ width: 12, height: 12, background: defaultValue}} />
        </PropInputPrefix>
      )}
      defaultValue={defaultValue} />
  )
}

ColorEditor.displayName = '';
ColorEditor.defaultProps = {
  defaultValue: '#fff',
}
