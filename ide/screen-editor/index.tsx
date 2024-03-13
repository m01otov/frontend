import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import Split from 'react-split';
import { flowResult } from 'mobx';
import { useMount } from 'react-use';

import { Toolbar } from '@lukoil/scad-ide-ui-core';
import { ScreenEditorContextProvider, TScreenEditorContextProviderProps, useScreenEditorContext } from './provider';
import { ScreenEditorMenu } from './components/editor-menu';
import { ScreenEditorToolsMenu } from './components/tools-menu';
import { ScreenEditorCanvas } from './components/canvas';
import { ScreenEditorOutliner } from './components/outliner';
import { ScreenEditorDetails } from './components/details';

import styles from './styles.module.scss';

type TScreenEditorProps = Omit<TScreenEditorContextProviderProps, 'children'>;

export const ScreenEditorContent = observer(forwardRef<HTMLDivElement, unknown>((_, ref) => {
  const { isLoading, load } = useScreenEditorContext();

  useMount(() => {
    flowResult(load())
  })
  
  if (isLoading) return 'Загрузка';

  return (
    <Split
      // NOTE: any used because Split has deprecated ref typings
      ref={ref as any}
      direction="horizontal"
      gutterSize={3}
      sizes={[80, 20]}
      className={styles.screen_editor}>

      <div 
        className={styles.screen_editor__workarea} >
        <Toolbar>
          <ScreenEditorMenu />

          <ScreenEditorToolsMenu />
        </Toolbar>

        <ScreenEditorCanvas />
      </div>

      <Split
        direction="vertical"
        gutterSize={3}
        sizes={[38, 62]}>
          <ScreenEditorOutliner />
          <ScreenEditorDetails />
      </Split>
    </Split>
  );

}))

export const ScreenEditor = forwardRef<HTMLDivElement, TScreenEditorProps>((props, ref) => (
  <ScreenEditorContextProvider {...props}>
    <ScreenEditorContent ref={ref} />
  </ScreenEditorContextProvider>
))

ScreenEditorContent.displayName = 'ScreenEditorContent';
ScreenEditor.displayName = 'ScreenEditor';
