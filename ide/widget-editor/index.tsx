import { forwardRef } from 'react';
import { flowResult } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useMount } from 'react-use';
import Split from 'react-split';

import { Toolbar } from '@lukoil/scad-ide-ui-core';
import { type TWidgetEditorContextProviderProps, WidgetEditorContextProvider, useWidgetEditorContext } from './provider';
import { WidgetEditorToolsMenu } from './components/tools-menu';
import { WidgetEditorOutliner } from './components/outliner';
import { WidgetEditorDetails } from './components/details';
import { WidgetEditorCanvas } from './components/canvas';
import { WidgetEditorMenu } from './components/editor-menu';

import styles from './styles.module.scss';

type TWidgetEditorProps = Omit<TWidgetEditorContextProviderProps, 'children'>;

export const WidgetEditorContent = observer(forwardRef<HTMLDivElement, unknown>((_, ref) => {
  const { isLoading, load } = useWidgetEditorContext();

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
      className={styles.widget_editor}>

      <div 
        className={styles.widget_editor__workarea} >
        <Toolbar>
          <WidgetEditorMenu />

          <WidgetEditorToolsMenu />
        </Toolbar>

        <WidgetEditorCanvas />
      </div>

      <Split
        direction="vertical"
        gutterSize={3}
        sizes={[38, 62]}>
          
        <WidgetEditorOutliner />

        <WidgetEditorDetails />
      </Split>
    </Split>
  );
}))

export const WidgetEditor = forwardRef<HTMLDivElement, TWidgetEditorProps>((props, ref) => (
  <WidgetEditorContextProvider {...props}>
    <WidgetEditorContent ref={ref} />
  </WidgetEditorContextProvider>
))

WidgetEditorContent.displayName = 'WidgetEditorContent';
WidgetEditor.displayName = 'WidgetEditor';
