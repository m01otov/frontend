import { createRoot } from 'react-dom/client';
import { configure } from 'mobx';
import { type Container } from 'inversify';
import { HTTP_SERVICE_TOKEN, type IHttpService, createHttpService } from '@lukoil/scad-runtime-request';

type TApplicationOptions = {}

const DEFAULT_APPlICATION_OPTIONS: TApplicationOptions = {}

export const createApp = async (
  elementId: string,
  diContainer: Container,
  options?: TApplicationOptions
) => {
  options = { ...DEFAULT_APPlICATION_OPTIONS, ...options };

  configure({ enforceActions: 'always' });
  
  diContainer
    .bind<IHttpService>(HTTP_SERVICE_TOKEN)
    .toConstantValue(createHttpService({
        api: { baseUrl: import.meta.env.VITE_API_URL }
      })
    );

  return createRoot(document.getElementById(elementId) as HTMLElement);
}
