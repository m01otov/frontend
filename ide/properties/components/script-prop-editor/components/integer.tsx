import { FC } from 'react';

import { Input } from '@lukoil/scad-ide-ui-core';

import { PropInputPrefix } from '../../prop-input-prefix';

import styles from '../styles.module.scss';

type TIntegerNumberEditorProps = {
  defaultValue: string
}

export const IntegerNumberEditor: FC<TIntegerNumberEditorProps> = ({ defaultValue }) => {

  return (
    <Input
      className={styles.control_input}
      sufix={<PropInputPrefix>int</PropInputPrefix>}
      defaultValue={defaultValue} />
  )
}

IntegerNumberEditor.displayName = '';
IntegerNumberEditor.defaultProps = {
  defaultValue: '',
}
