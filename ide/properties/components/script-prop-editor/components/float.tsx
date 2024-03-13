import { FC } from 'react';

import { Input } from '@lukoil/scad-ide-ui-core';

import { PropInputPrefix } from '../../prop-input-prefix';

import styles from '../styles.module.scss';

type TFloatNumberEditorProps = {
  defaultValue: string
}

export const FloatNumberEditor: FC<TFloatNumberEditorProps> = ({ defaultValue }) => {

  return (
    <Input
      className={styles.control_input}
      sufix={<PropInputPrefix>float</PropInputPrefix>}
      defaultValue={defaultValue} />
  )
}

FloatNumberEditor.displayName = '';
FloatNumberEditor.defaultProps = {
  defaultValue: '',
}
