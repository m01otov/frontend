import { FC } from 'react';

import { Input } from '@lukoil/scad-ide-ui-core';

import styles from '../styles.module.scss';

type TUIntegerEditorProps = {
  defaultValue: string
}

export const UIntegerEditor: FC<TUIntegerEditorProps> = ({ defaultValue }) => {

  return (
    <Input
      className={styles.control_input}
      defaultValue={defaultValue} />
  )
}

UIntegerEditor.displayName = '';
UIntegerEditor.defaultProps = {
  defaultValue: '',
}
