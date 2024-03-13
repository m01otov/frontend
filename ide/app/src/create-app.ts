import { createRoot } from 'react-dom/client';
import { configure } from 'mobx';
import { setLocale } from 'yup';
import * as yupLocale from '@configs/yup-locale.config';
import { type Container } from 'inversify';

import { EFileExtension } from '@lukoil/scad-file-explorer/enums';
import { CodeEditor } from '@lukoil/scad-ide-code-editor';
import { WidgetEditor } from '@lukoil/scad-ide-widget-editor';
import { ScreenEditor } from '@lukoil/scad-ide-screen-editor';
import { type INotificationsContext, NOTIFICATION_CONTEXT_TOKEN, createNotificationsContext } from '@lukoil/scad-ide-notifications';
import { type ISettingsContext, SETTINGS_CONTEXT_TOKEN, createSettingsContext } from '@lukoil/scad-ide-settings';
import { type IHttpService, HTTP_SERVICE_TOKEN, createHttpService } from '@lukoil/scad-runtime-request';
import { IDE_CONTEXT_TOKEN, createIDEContext } from './context';
import type { IIDEContext } from './interfaces';


type TApplicationOptions = {
  enableMockWorker: boolean;
}

const DEFAULT_APPlICATION_OPTIONS: TApplicationOptions = {
  enableMockWorker: true,
}

export const createApp = async (
  elementId: string,
  diContainer: Container,
  options?: TApplicationOptions
) => {
  options = { ...DEFAULT_APPlICATION_OPTIONS, ...options };

  setLocale(yupLocale);
  configure({ enforceActions: 'always' });
  
  // Stup mocks
  if (import.meta.env.MODE === 'development' && options.enableMockWorker) {
    const { worker } = await import('./mocks/setup');
    worker.start();
  }

  diContainer
    .bind<IHttpService>(HTTP_SERVICE_TOKEN)
    .toConstantValue(createHttpService({
        api: { baseUrl: import.meta.env.VITE_API_URL }
      })
    );

  diContainer
    .bind<INotificationsContext>(NOTIFICATION_CONTEXT_TOKEN)
    .toConstantValue(createNotificationsContext())

  // Setup global DI dependencies
  diContainer
    .bind<IIDEContext>(IDE_CONTEXT_TOKEN)
    .toConstantValue(createIDEContext({
      assetEditors: new Map([
        [EFileExtension.JS, CodeEditor],
        [EFileExtension.WGT, WidgetEditor],
        [EFileExtension.SCRN, ScreenEditor],
      ]),
    }));

  diContainer
    .bind<ISettingsContext>(SETTINGS_CONTEXT_TOKEN)
    .toConstantValue(createSettingsContext({
        theme: 'dark'
      })
    );

  return createRoot(document.getElementById(elementId) as HTMLElement);
}
