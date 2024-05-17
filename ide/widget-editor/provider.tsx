import { type PropsWithChildren, createContext, type FC, useContext, useMemo } from 'react';

import { inject } from '@lukoil/scad-runtime-core';
import type { IFile } from '@lukoil/scad-file-explorer';
import { HTTP_SERVICE_TOKEN } from '@lukoil/scad-runtime-request';
import { NOTIFICATION_CONTEXT_TOKEN } from '@lukoil/scad-ide-notifications';
import { createWidgetEditorContext } from './context';
import { IWidgetEditorContext } from './interfaces';
import { SelectTool, DrawLineTool, DrawRectTool, DrawEllipseTool, EEditorTool, EEditorToolCategory, DrawContainerTool, DrawChartsTool, DrawTextTool, DrawInputTool, DrawButtonTool } from '@lukoil/scad-ide-tools';

const WindgetEditorContext = createContext<IWidgetEditorContext>({} as IWidgetEditorContext);

export type TWidgetEditorContextProviderProps = PropsWithChildren<{
  onClose?: () => void;
  file: IFile;
}>;

export const WidgetEditorContextProvider: FC<TWidgetEditorContextProviderProps> = ({
  file,
  onClose,
  children
}) => {

  const contextInstance = useMemo(() => {
    const instance = inject<IWidgetEditorContext>(createWidgetEditorContext, [
      HTTP_SERVICE_TOKEN,
      NOTIFICATION_CONTEXT_TOKEN,
    ])({
      tools: {
        [EEditorTool.SELECT]: {
          displayName: 'Выбор элементов',
          component: SelectTool
        },
        [EEditorTool.LINE]: {
          category: EEditorToolCategory.PRIMITIVES,
          displayName: 'Линия',
          component: DrawLineTool
        },
        [EEditorTool.RECT]: {
          category: EEditorToolCategory.PRIMITIVES,
          displayName: 'Прямоугольник',
          component: DrawRectTool
        },
        [EEditorTool.ELLIPSE]: {
          category: EEditorToolCategory.PRIMITIVES,
          displayName: 'Эллипс',
          component: DrawEllipseTool
        },
        [EEditorTool.CONTAINER]: {
          category: EEditorToolCategory.ADVANCED,
          displayName: 'Контейнер',
          component: DrawContainerTool
        },
        [EEditorTool.TEXT]: {
          category: EEditorToolCategory.ADVANCED,
          displayName: 'Текст',
          component: DrawTextTool
        },
        [EEditorTool.INPUT]: {
          category: EEditorToolCategory.ADVANCED,
          displayName: 'Поле ввода',
          component: DrawInputTool
        },
        [EEditorTool.BUTTON]: {
          category: EEditorToolCategory.ADVANCED,
          displayName: 'Кнопка',
          component: DrawButtonTool
        },
        [EEditorTool.CHART]: {
          category: EEditorToolCategory.ADVANCED,
          displayName: 'График',
          component: DrawChartsTool
        }
      },
      defaultActiveToolId: EEditorTool.SELECT,
      file,
    });

    onClose && instance.onClose.connect(onClose);

    return instance;
  }, []);

  return (
    <WindgetEditorContext.Provider
      value={contextInstance}>
      {children}
    </WindgetEditorContext.Provider>
  );
}

export const useWidgetEditorContext = () => {
  const store = useContext(WindgetEditorContext);
  
  if (!store) {
    throw new Error('useWidgetEditorContext must be used within a WidgetEditorContextProvider!');
  }

  return store;
}
