import './monaco.workers';
import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useMount } from 'react-use';
import { flowResult } from 'mobx';

import { Toolbar } from '@lukoil/scad-ide-ui-core';

import { CodeEditorMenu } from './components/editor-menu';
import { CodeEditorContextProvider, TCodeEditorContextProviderProps, useCodeEditorContext } from './provider';
import { Monaco } from './components/monaco';

import styles from './styles.module.scss';

type TCodeEditorProps = Omit<TCodeEditorContextProviderProps, 'children'>;

export const CodeEditorContent = observer(forwardRef<HTMLDivElement, unknown>(() => {
  const { isLoading, load, fileId } = useCodeEditorContext();

  useMount(() => {
    flowResult(load())
  })

  if (isLoading) return 'Загрузка';

  return (
    <div className={styles.code_editor}>
      <Toolbar>
        <CodeEditorMenu />
      </Toolbar>

      <Monaco path={fileId} />
    </div>
  )
}))

export const CodeEditor = forwardRef<HTMLDivElement, TCodeEditorProps>((props, ref) => (
  <CodeEditorContextProvider {...props}>
    <CodeEditorContent ref={ref} />
  </CodeEditorContextProvider>
))

CodeEditorContent.displayName = 'CodeEditorContent';
CodeEditor.displayName = 'CodeEditor';
