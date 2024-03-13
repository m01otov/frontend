import type { FC } from 'react';
import { Signal } from 'typed-signals';

import type { IFile } from '@lukoil/scad-file-explorer';
import type { TEntity, TRectangle } from '@lukoil/scad-runtime-core';
import type { TToolBaseProps, TToolsList } from '@lukoil/scad-ide-tools';
import type { EEditorTool } from '@lukoil/scad-ide-tools';
import { IWidgetModel } from '.';

export type TWidgetEditorContextProps = {

  tools: Partial<TToolsList>;

  defaultActiveToolId: EEditorTool;

  file: IFile;

}

export interface IWidgetEditorContext {

  widget: IWidgetModel;

  activeToolId: EEditorTool;

  isLoading: boolean;

  onClose: Signal<() => void>;

  selection: string[];

  setActiveTool: (value: EEditorTool) => void;
  
  resetTool: () => void;

  makeSelection: (value: string[]) => void;

  clearSelection: () => void;

  load: () => void;

  save: () => void;

  closeEditor: () => void;

  readonly tools: Partial<TToolsList>;

  readonly activeToolComponent: FC<TToolBaseProps>;

  readonly selectedEntities: TEntity[];

  readonly selectionBoundingBox: TRectangle;

}
