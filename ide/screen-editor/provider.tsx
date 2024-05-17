import { type PropsWithChildren, createContext, useMemo, useContext, type FC } from 'react';

import { IFile } from '@lukoil/scad-file-explorer';
import { HTTP_SERVICE_TOKEN } from '@lukoil/scad-runtime-request';
import { NOTIFICATION_CONTEXT_TOKEN } from '@lukoil/scad-ide-notifications';
import { inject } from '@lukoil/scad-runtime-core';
import type { IScreenEditorContext } from './interfaces';
import { createScreenEditorContext } from './context';
import { DrawButtonTool, DrawContainerTool,DrawChartsTool, DrawEllipseTool, DrawInputTool, DrawLineTool, DrawRectTool, DrawTextTool, EEditorTool, EEditorToolCategory, SelectTool } from '@lukoil/scad-ide-tools';

const ScreenEditorContext = createContext<IScreenEditorContext>({} as IScreenEditorContext);

export type TScreenEditorContextProviderProps = PropsWithChildren<{
  onClose?: () => void;
  file: IFile;
}>;

export const ScreenEditorContextProvider: FC<TScreenEditorContextProviderProps> = ({
  file,
  onClose,
  children
}) => {
  const contextInstance = useMemo(() => {
    const instance = inject<IScreenEditorContext>(createScreenEditorContext, [
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
        [EEditorTool.CHART]: {
          category: EEditorToolCategory.ADVANCED,
          displayName: 'Canvas',
          component: DrawChartsTool
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
        }
      },
      defaultActiveToolId: EEditorTool.SELECT,
      file
    })
    
    onClose && instance.onClose.connect(onClose);

    return instance;
  }, [])
  
  return (
    <ScreenEditorContext.Provider
      value={contextInstance}>
      {children}
    </ScreenEditorContext.Provider>
  );
}

export const useScreenEditorContext = () => {
  const store = useContext(ScreenEditorContext);
  
  if (!store) {
    throw new Error('useScreenEditorContext must be used within a ScreenEditorContextProvider!');
  }

  return store;
}
