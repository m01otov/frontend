import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import { type Container } from 'inversify';

import { DefaultLayout } from '@layouts/default';
import { NotFoundScreen } from '@screens/_not-found.screen';
import { ProjectsScreen } from '@screens/projects/index.screen';
import { ProjectScreen } from '@screens/projects/[id].screen';
import { SettingsScreen } from '@screens/settings.screen';
import { HelpScreen } from '@screens/help.screen';
import { IDE_CONTEXT_TOKEN } from './context';
import { type IIDEContext } from './interfaces';

export const createRouter = (diContainer: Container) => {
  const ideContext = diContainer.get<IIDEContext>(IDE_CONTEXT_TOKEN);

  return createBrowserRouter([{
    element: <DefaultLayout />,
    children: [{
      path: '/',
      element: <Navigate to='/projects' replace={true} />,
    }, {
      path: '/projects',
      element: <Outlet />,
      children: [{
        index: true,
        element: <ProjectsScreen />
      }, {
        path: ':id',
        /* TODO: При загрузке проекта не устанавливается активный id открытого файла. Известен только id проекта.
          Поэтому при загрузке невозможно понять какой из файлов в дереве проекта должен быть активным. */
        loader: ({ params }) => {
          if (ideContext) {
            ideContext.setProjectId(params.id || null);
          }

          return null;
        },
        element: <ProjectScreen />
      }]
    }, {
      path: '/settings',
      element: <SettingsScreen />
    }, {
      path: '/help',
      element: <HelpScreen />,
    }, {
      path: "*",
      element: <NotFoundScreen/>
    }]
  }])
}

