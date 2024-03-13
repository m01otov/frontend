import { FC } from 'react';
import { Signal } from 'typed-signals';

import type { IFile } from '@lukoil/scad-file-explorer';
import type { IEntitiesCollection, TEntity, TRectangle } from '@lukoil/scad-runtime-core';
import { EEditorTool, TToolBaseProps, type TToolsList } from '@lukoil/scad-ide-tools';

export type TScreenEditorContextProps = {

  tools: Partial<TToolsList>;

  defaultActiveToolId: EEditorTool;

  file: IFile;

}

export interface IScreenEditorContext {

  entities: IEntitiesCollection;
  
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
